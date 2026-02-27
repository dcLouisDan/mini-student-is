import Subject from '#models/subject'
import SubjectTransformer from '#transformers/subject_transformer'
import {
  attachSubjectPrerequisiteValidator,
  showSubjectPrerequisiteValidator,
  showSubjectValidator,
} from '#validators/subject'
import type { HttpContext } from '@adonisjs/core/http'

export default class SubjectPrerequisitesController {
  async index({ request, serialize }: HttpContext) {
    const {
      params: { id },
    } = await request.validateUsing(showSubjectValidator)

    const subject = await Subject.findOrFail(id)
    const prerequisites = await subject.related('prerequisites').query()

    return serialize(SubjectTransformer.transform(prerequisites))
  }

  async store({ request, serialize }: HttpContext) {
    const {
      params: { id },
      prerequisiteSubjectId,
    } = await request.validateUsing(attachSubjectPrerequisiteValidator)

    const subject = await Subject.findOrFail(id)
    const prerequisiteSubject = await Subject.findOrFail(prerequisiteSubjectId)

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
