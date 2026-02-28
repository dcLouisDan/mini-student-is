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

  async store({ request, serialize, response }: HttpContext) {
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

    const prerequisites = await subject.related('prerequisites').query()

    return serialize(SubjectTransformer.transform(prerequisites))
  }

  async destroy({ request, serialize }: HttpContext) {
    const {
      params: { id, prerequisiteSubjectId },
    } = await request.validateUsing(showSubjectPrerequisiteValidator)

    const subject = await Subject.findOrFail(id)
    const prerequisiteSubject = await Subject.findOrFail(prerequisiteSubjectId)

    await subject.related('prerequisites').detach([prerequisiteSubject.id])

    const prerequisites = await subject.related('prerequisites').query()

    return serialize(SubjectTransformer.transform(prerequisites))
  }
}
