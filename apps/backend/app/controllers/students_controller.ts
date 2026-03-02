import Student from '#models/student'
import {
  createStudentValidator,
  indexStudentValidator,
  showStudentValidator,
  updateStudentValidator,
} from '#validators/student'
import type { HttpContext } from '@adonisjs/core/http'
import { DEFAULT_PER_PAGE_LIMIT, SortOrder } from '../../lib/constants.ts'
import StudentTransformer from '#transformers/student_transformer'
import { activity } from '@holoyan/adonisjs-activitylog'

export default class StudentsController {
  /**
   * Display a list of resource
   */
  async index({ request, serialize }: HttpContext) {
    const {
      qs: { page, perPage, courseId, sortBy, sortOrder, studentNo, firstName, lastName },
    } = await request.validateUsing(indexStudentValidator)
    const filters = { courseId }
    const ilikeFilters = { studentNo, firstName, lastName }
    let studentsRaw = Student.query().preload('course')

    const sortColumn = sortBy ?? 'createdAt'
    const order: SortOrder = (sortOrder as SortOrder) ?? 'asc'

    Object.entries(filters).forEach(([key, value]) => {
      if (value) studentsRaw.where(key, value)
    })

    Object.entries(ilikeFilters).forEach(([key, value]) => {
      if (value) studentsRaw.orWhereILike(key, `%${value}%`)
    })

    studentsRaw = studentsRaw.orderBy(sortColumn, order)

    const students = await studentsRaw.paginate(page ?? 1, perPage ?? DEFAULT_PER_PAGE_LIMIT)

    const data = students.all()
    const metadata = students.getMeta()

    return serialize(StudentTransformer.paginate(data, metadata))
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, serialize, auth: { user: authUser } }: HttpContext) {
    const { courseId, firstName, lastName, email, birthDate } =
      await request.validateUsing(createStudentValidator)

    const studentNo = await this.generateStudentNo()
    const student = await Student.create({
      courseId,
      studentNo,
      firstName,
      lastName,
      email,
      birthDate,
    })

    if (authUser) {
      await activity().by(authUser).making('create').on(student).log('Student successfully created')
    }

    return serialize(StudentTransformer.transform(student))
  }

  /**
   * Show individual record
   */
  async show({ request, serialize }: HttpContext) {
    const {
      params: { id },
    } = await request.validateUsing(showStudentValidator)

    const student = await Student.query().preload('course').where('id', id).firstOrFail()

    return serialize(StudentTransformer.transform(student))
  }

  /**
   * Edit individual record
   */
  async edit({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ request, serialize, auth: { user: authUser } }: HttpContext) {
    const {
      params: { id },
      courseId,
      firstName,
      lastName,
      email,
      birthDate,
    } = await request.validateUsing(updateStudentValidator)

    const student = await Student.findOrFail(id)

    await student
      .merge({
        courseId,
        firstName,
        lastName,
        email,
        birthDate,
      })
      .save()

    if (authUser) {
      await activity().by(authUser).making('update').on(student).log('Student successfully updated')
    }

    return serialize(StudentTransformer.transform(student))
  }

  /**
   * Delete record
   */
  async destroy({ request, response, auth: { user: authUser } }: HttpContext) {
    const {
      params: { id },
    } = await request.validateUsing(showStudentValidator)

    const student = await Student.findOrFail(id)

    await student.delete()

    if (authUser) {
      await activity().by(authUser).making('delete').on(student).log('Student successfully deleted')
    }

    return response.status(200).send({ success: true, message: 'Student deleted' })
  }

  private async generateStudentNo() {
    const year = new Date().getFullYear()

    const lastStudent = await Student.query()
      .select('studentNo')
      .whereLike('studentNo', `${year}%`)
      .orderBy('studentNo', 'desc')
      .first()

    const lastNo = lastStudent ? lastStudent.studentNo : `${year}000000`
    const nextNo = (Number(lastNo) + 1).toString().padStart(10, '0')

    return nextNo
  }
}
