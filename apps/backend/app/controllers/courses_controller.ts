import Course from '#models/course'
import CourseTransformer from '#transformers/course_transformer'
import {
  batchCourseDeleteValidator,
  createCourseValidator,
  indexCourseValidator,
  showCourseValidator,
  updateCourseValidator,
} from '#validators/course'
import type { HttpContext } from '@adonisjs/core/http'
import { DEFAULT_PER_PAGE_LIMIT, SortOrder } from '../../lib/constants.ts'
import db from '@adonisjs/lucid/services/db'

export default class CoursesController {
  /**
   * Display a list of resource
   */
  async index({ serialize, request }: HttpContext) {
    const {
      qs: { page, perPage, sortBy, sortOrder, code, name },
    } = await request.validateUsing(indexCourseValidator)

    const sortColumn = sortBy ?? 'createdAt'
    const order: SortOrder = (sortOrder as SortOrder) ?? 'asc'
    const ilikeFilters = { code, name }
    const coursesRaw = Course.query()

    Object.entries(ilikeFilters).forEach(([key, value]) => {
      if (value) coursesRaw.orWhereILike(key, `%${value}%`)
    })

    const courses = await coursesRaw
      .orderBy(sortColumn, order)
      .paginate(page ?? 1, perPage ?? DEFAULT_PER_PAGE_LIMIT)

    const data = courses.all()
    const metadata = courses.getMeta()

    return serialize(CourseTransformer.paginate(data, metadata))
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ serialize, request }: HttpContext) {
    const { code, name, description } = await request.validateUsing(createCourseValidator)

    const course = await Course.create({ code, name, description })

    return serialize(CourseTransformer.transform(course))
  }

  /**
   * Show individual record
   */
  async show({ request, serialize }: HttpContext) {
    const {
      params: { id },
    } = await request.validateUsing(showCourseValidator)

    const course = await Course.findOrFail(id)

    return serialize(CourseTransformer.transform(course))
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
      code,
      name,
      description,
      params: { id },
    } = await request.validateUsing(updateCourseValidator)

    const course = await Course.findOrFail(id)

    await course.merge({ code, name, description }).save()

    return serialize(CourseTransformer.transform(course))
  }

  /**
   * Delete record
   */
  async destroy({ request, response }: HttpContext) {
    const {
      params: { id },
    } = await request.validateUsing(showCourseValidator)
    const course = await Course.findOrFail(id)

    await course.delete()

    return response.status(200).send({ success: true, message: 'Course deleted' })
  }

  async batchDestroy({ request, response, auth: { user: authUser } }: HttpContext) {
    if (!authUser) {
      return response.unauthorized()
    }

    if (authUser.role !== 'admin') {
      return response.unauthorized()
    }

    const { idArr } = await request.validateUsing(batchCourseDeleteValidator)

    await db.transaction(async (trx) => {
      await Course.query({ client: trx }).whereIn('id', idArr).delete()
    })

    return response.ok({
      message: 'Courses deleted',
      idArr,
    })
  }
}
