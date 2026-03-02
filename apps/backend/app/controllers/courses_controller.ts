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
import { activity } from '@holoyan/adonisjs-activitylog'

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
  async store({ serialize, request, auth: { user: authUser } }: HttpContext) {
    const { code, name, description } = await request.validateUsing(createCourseValidator)

    const course = await Course.create({ code, name, description })

    if (authUser) {
      await activity().by(authUser).making('create').on(course).log('Course successfully created')
    }

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
  async update({ request, serialize, auth: { user: authUser } }: HttpContext) {
    const {
      code,
      name,
      description,
      params: { id },
    } = await request.validateUsing(updateCourseValidator)

    const course = await Course.findOrFail(id)

    await course.merge({ code, name, description }).save()

    if (authUser) {
      await activity().by(authUser).making('update').on(course).log('Course successfully updated')
    }

    return serialize(CourseTransformer.transform(course))
  }

  /**
   * Delete record
   */
  async destroy({ request, response, auth: { user: authUser } }: HttpContext) {
    const {
      params: { id },
    } = await request.validateUsing(showCourseValidator)
    const course = await Course.findOrFail(id)

    await course.delete()

    if (authUser) {
      await activity().by(authUser).making('delete').on(course).log('Course successfully deleted')
    }

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

    await activity()
      .by(authUser)
      .making('batch-delete')
      .havingCurrent({ idArr })
      .log('Courses deleted')

    return response.ok({
      message: 'Courses deleted',
      idArr,
    })
  }
}
