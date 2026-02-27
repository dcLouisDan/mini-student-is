import Course from '#models/course'
import CourseTransformer from '#transformers/course_transformer'
import {
  createCourseValidator,
  indexCourseValidator,
  showCourseValidator,
  updateCourseValidator,
} from '#validators/course'
import type { HttpContext } from '@adonisjs/core/http'
import { DEFAULT_PER_PAGE_LIMIT } from '../../lib/constants.ts'

export default class CoursesController {
  /**
   * Display a list of resource
   */
  async index({ serialize, request }: HttpContext) {
    const {
      qs: { page, perPage },
    } = await request.validateUsing(indexCourseValidator)
    const courses = await Course.query().paginate(page ?? 1, perPage ?? DEFAULT_PER_PAGE_LIMIT)

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
}
