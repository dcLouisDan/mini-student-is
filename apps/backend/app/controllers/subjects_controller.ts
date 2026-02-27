import Subject from '#models/subject'
import {
  createSubjectValidator,
  indexSubjectValidator,
  showSubjectValidator,
  updateSubjectValidator,
} from '#validators/subject'
import type { HttpContext } from '@adonisjs/core/http'
import { DEFAULT_PER_PAGE_LIMIT, SortOrder } from '../../lib/constants.ts'
import SubjectTransformer from '#transformers/subject_transformer'

export default class SubjectsController {
  /**
   * Display a list of resource
   */
  async index({ request, serialize }: HttpContext) {
    const {
      qs: { page, perPage, courseId, sortBy, sortOrder },
    } = await request.validateUsing(indexSubjectValidator)
    const filters = { courseId }
    let subjectsRaw = Subject.query().preload('course')

    const sortColumn = sortBy ?? 'createdAt'
    const order: SortOrder = (sortOrder as SortOrder) ?? 'asc'

    Object.entries(filters).forEach(([key, value]) => {
      if (value) subjectsRaw.where(key, value)
    })

    subjectsRaw = subjectsRaw.orderBy(sortColumn, order)

    const subjects = await subjectsRaw.paginate(page ?? 1, perPage ?? DEFAULT_PER_PAGE_LIMIT)

    const data = subjects.all()
    const metadata = subjects.getMeta()

    return serialize(SubjectTransformer.paginate(data, metadata))
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, serialize }: HttpContext) {
    const { courseId, code, title, units, passingGrade } =
      await request.validateUsing(createSubjectValidator)

    const subject = await Subject.create({ courseId, code, title, units, passingGrade })

    return serialize(SubjectTransformer.transform(subject))
  }

  /**
   * Show individual record
   */
  async show({ request, serialize }: HttpContext) {
    const {
      params: { id },
    } = await request.validateUsing(showSubjectValidator)

    const subject = await Subject.query().preload('course').where('id', id).firstOrFail()

    return serialize(SubjectTransformer.transform(subject))
  }

  /**
   * Edit individual record
   */
  async edit({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ request, serialize }: HttpContext) {
    const {
      courseId,
      code,
      title,
      units,
      passingGrade,
      params: { id },
    } = await request.validateUsing(updateSubjectValidator)

    const subject = await Subject.findOrFail(id)

    await subject.merge({ courseId, code, title, units, passingGrade }).save()

    return serialize(SubjectTransformer.transform(subject))
  }

  /**
   * Delete record
   */
  async destroy({ request, response }: HttpContext) {
    const {
      params: { id },
    } = await request.validateUsing(showSubjectValidator)
    const subject = await Subject.findOrFail(id)

    await subject.delete()

    return response.status(200).send({ success: true, message: 'Subject deleted' })
  }
}
