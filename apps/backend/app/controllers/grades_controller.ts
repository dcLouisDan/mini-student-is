import Grade from '#models/grade'
import {
  groupUpsertGradeValidator,
  indexGradeValidator,
  upsertGradeValidator,
} from '#validators/grade'
import type { HttpContext } from '@adonisjs/core/http'
import { DEFAULT_PER_PAGE_LIMIT, SortOrder, UserRole } from '../../lib/constants.ts'
import GradeTransformer from '#transformers/grade_transformer'
import { activity } from '@holoyan/adonisjs-activitylog'

export default class GradesController {
  /**
   * Display a list of resource
   */
  async index({ request, serialize }: HttpContext) {
    const {
      qs: {
        page,
        perPage,
        sortBy,
        sortOrder,
        studentId,
        courseId,
        subjectId,
        sortByStudent,
        sortOrderStudent,
      },
    } = await request.validateUsing(indexGradeValidator)

    const filters = { courseId, studentId, subjectId }
    let gradesRaw = Grade.query()
      .preload('course')
      .preload('student')
      .preload('subject')
      .preload('encodedByUser')
      .join('students', 'grades.student_id', '=', 'students.id')
      .select('grades.*')
      .select(['students.first_name', 'students.last_name', 'students.student_no'])

    Object.entries(filters).forEach(([key, value]) => {
      if (value) gradesRaw.where(key, value)
    })

    if (sortByStudent) {
      const studentOrder = (sortOrderStudent as SortOrder) ?? 'asc'
      gradesRaw.orderBy(`students.${sortByStudent}`, studentOrder)
    } else {
      const sortColumn = sortBy ?? 'createdAt'
      const order: SortOrder = (sortOrder as SortOrder) ?? 'asc'
      gradesRaw = gradesRaw.orderBy(sortColumn, order)
    }

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
  async store({ request, response, serialize, auth: { user: authUser } }: HttpContext) {
    const allowedRoles: UserRole[] = ['admin', 'encoder']

    if (!authUser) {
      return response.unauthorized()
    }

    if (!allowedRoles.includes(authUser.role as UserRole)) {
      return response.unauthorized()
    }
    const { gradeRecords } = await request.validateUsing(groupUpsertGradeValidator)

    const grades = await Grade.updateOrCreateMany(['id'], gradeRecords)

    await activity()
      .by(authUser)
      .making('create')
      .havingCurrent({ gradeRecords })
      .log('Grades successfully saved')

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
  async update({ request, response, serialize, auth: { user: authUser } }: HttpContext) {
    const allowedRoles: UserRole[] = ['admin', 'encoder']

    if (!authUser) {
      return response.unauthorized()
    }

    if (!allowedRoles.includes(authUser.role as UserRole)) {
      return response.unauthorized()
    }

    const {
      params: { id },
      studentId,
      subjectId,
      courseId,
      prelim,
      midterm,
      finals,
      finalGrade,
      remarks,
      encodedByUserId,
    } = await request.validateUsing(upsertGradeValidator)

    const grade = await Grade.updateOrCreate(
      {
        id,
      },
      {
        studentId,
        subjectId,
        courseId,
        prelim,
        midterm,
        finals,
        finalGrade,
        remarks,
        encodedByUserId: encodedByUserId ?? authUser.id,
      }
    )

    await activity().by(authUser).making('update').on(grade).log('Grade updated')

    return serialize(GradeTransformer.transform(grade))
  }

  /**
   * Delete record
   */
  async destroy({}: HttpContext) {}
}
