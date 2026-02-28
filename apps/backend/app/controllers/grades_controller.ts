import Grade from '#models/grade'
import {
  groupUpsertGradeValidator,
  indexGradeValidator,
  upsertGradeValidator,
} from '#validators/grade'
import type { HttpContext } from '@adonisjs/core/http'
import { DEFAULT_PER_PAGE_LIMIT, SortOrder } from '../../lib/constants.ts'
import GradeTransformer from '#transformers/grade_transformer'

export default class GradesController {
  /**
   * Display a list of resource
   */
  async index({ request, serialize }: HttpContext) {
    const {
      qs: { page, perPage, sortBy, sortOrder, studentId, courseId, subjectId },
    } = await request.validateUsing(indexGradeValidator)

    const filters = { courseId, studentId, subjectId }
    let gradesRaw = Grade.query().preload('course').preload('student').preload('subject')

    const sortColumn = sortBy ?? 'createdAt'
    const order: SortOrder = (sortOrder as SortOrder) ?? 'asc'

    Object.entries(filters).forEach(([key, value]) => {
      if (value) gradesRaw.where(key, value)
    })

    gradesRaw = gradesRaw.orderBy(sortColumn, order)

    const grades = await gradesRaw.paginate(page ?? 1, perPage ?? DEFAULT_PER_PAGE_LIMIT)

    const data = grades.all()
    const metadata = grades.getMeta()

    return serialize(GradeTransformer.paginate(data, metadata))
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, serialize }: HttpContext) {
    const { gradeRecords } = await request.validateUsing(groupUpsertGradeValidator)

    const grades = await Grade.updateOrCreateMany(
      ['courseId', 'studentId', 'subjectId'],
      gradeRecords
    )

    return serialize(GradeTransformer.transform(grades))
  }

  /**
   * Show individual record
   */
  async show({}: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ request, serialize }: HttpContext) {
    const {
      params: { id },
      gradeRecord,
    } = await request.validateUsing(upsertGradeValidator)

    const grade = await Grade.updateOrCreate(
      {
        id,
      },
      gradeRecord
    )

    return serialize(GradeTransformer.transform(grade))
  }

  /**
   * Delete record
   */
  async destroy({}: HttpContext) {}
}
