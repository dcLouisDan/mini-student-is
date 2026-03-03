import Subject from '#models/subject'
import { SubjectDependencyGraphService } from '#services/subject_dependency_graph_service'
import SubjectTransformer from '#transformers/subject_transformer'
import {
  attachSubjectPrerequisiteValidator,
  showSubjectPrerequisiteValidator,
  showSubjectValidator,
} from '#validators/subject'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { activity } from '@holoyan/adonisjs-activitylog'

@inject()
export default class SubjectPrerequisitesController {
  constructor(protected subjectDependencyGraphService: SubjectDependencyGraphService) {}

  async index({ request, serialize }: HttpContext) {
    const {
      params: { id },
    } = await request.validateUsing(showSubjectValidator)

    const subject = await Subject.findOrFail(id)
    const prerequisites = await subject.related('prerequisites').query()

    return serialize(SubjectTransformer.transform(prerequisites))
  }

  async prereqOptionsIndex({ request, serialize }: HttpContext) {
    const {
      params: { id },
    } = await request.validateUsing(showSubjectValidator)

    const subject = await Subject.findOrFail(id)

    const options = await Subject.query()
      .preload('prerequisites')
      .where('courseId', subject.courseId)
      .whereNot('id', subject.id)
      .whereDoesntHave('prerequisiteTo', (query) => {
        query.where('subject_id', subject.id)
      })
      .whereDoesntHave('prerequisites', (query) => {
        query.where('prerequisite_subject_id', subject.id)
      })

    const validOptions: Subject[] = []
    for (const option of options) {
      const hasCycle = await this.subjectDependencyGraphService.checkForCircularDependency(
        subject.id,
        option.id
      )
      if (!hasCycle) {
        validOptions.push(option)
      }
    }

    return serialize(SubjectTransformer.transform(validOptions))
  }

  async store({ request, serialize, response, auth: { user: authUser } }: HttpContext) {
    const {
      params: { id },
      prerequisiteSubjectId,
    } = await request.validateUsing(attachSubjectPrerequisiteValidator)

    if (id === prerequisiteSubjectId) {
      return response.badRequest({
        errors: {
          prerequisiteSubjectId: ['Subject cannot be its own prerequisite'],
        },
      })
    }

    const subject = await Subject.findOrFail(id)
    const prerequisiteSubject = await Subject.findOrFail(prerequisiteSubjectId)

    await subject.load('prerequisites')

    const prereqExists = subject.prerequisites.some((row) => row.id === prerequisiteSubjectId)

    if (prereqExists) {
      return response.badRequest({
        errors: {
          prerequisiteSubjectId: ['Relationship already exists'],
        },
      })
    }

    if (subject.courseId !== prerequisiteSubject.courseId) {
      return response.badRequest({
        errors: {
          prerequisiteSubjectId: ['Both subjects need to be from the same course'],
        },
      })
    }

    const hasCircularDependency =
      await this.subjectDependencyGraphService.checkForCircularDependency(
        subject.id,
        prerequisiteSubject.id
      )

    if (hasCircularDependency) {
      return response.badRequest({
        errors: {
          prerequisiteSubjectId: ['Circular dependency detected'],
        },
      })
    }

    await subject.related('prerequisites').attach([prerequisiteSubject.id])

    await this.subjectDependencyGraphService.invalidateGraphCache()

    const prerequisites = await subject.related('prerequisites').query()

    if (authUser) {
      await activity()
        .by(authUser)
        .on(subject)
        .making('attach-prerequisite')
        .havingCurrent({ id, prerequisiteSubjectId })
        .log('Prerequisite attached to subject')
    }

    return serialize(SubjectTransformer.transform(prerequisites))
  }

  async destroy({ request, serialize, auth: { user: authUser } }: HttpContext) {
    const {
      params: { id, prerequisiteSubjectId },
    } = await request.validateUsing(showSubjectPrerequisiteValidator)

    const subject = await Subject.findOrFail(id)
    const prerequisiteSubject = await Subject.findOrFail(prerequisiteSubjectId)

    await subject.related('prerequisites').detach([prerequisiteSubject.id])
    await this.subjectDependencyGraphService.invalidateGraphCache()

    const prerequisites = await subject.related('prerequisites').query()

    if (authUser) {
      await activity()
        .by(authUser)
        .on(subject)
        .making('dettach-prerequisite')
        .havingCurrent({ id, prerequisiteSubjectId })
        .log('Prerequisite dettached from subject')
    }

    return serialize(SubjectTransformer.transform(prerequisites))
  }
}
