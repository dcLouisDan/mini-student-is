import Student from '#models/student'
import { SubjectService } from '#services/subject_service'
import SubjectTransformer from '#transformers/subject_transformer'
import {
  attachStudentReservationValidator,
  showStudentReservationValidator,
  showStudentValidator,
} from '#validators/student'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class StudentReservationsController {
  constructor(protected subjectService: SubjectService) {}

  async index({ request, serialize }: HttpContext) {
    const {
      params: { id },
    } = await request.validateUsing(showStudentValidator)

    const student = await Student.query()
      .preload('reservedSubjects', (query) => query.pivotColumns(['status', 'reservedAt']))
      .where('id', id)
      .firstOrFail()
    const reservedSubjects = await student.related('reservedSubjects').query()

    return serialize(SubjectTransformer.transform(reservedSubjects).useVariant('withExtras'))
  }

  async store({ request, serialize, response }: HttpContext) {
    const {
      params: { id },
      subjectIds,
    } = await request.validateUsing(attachStudentReservationValidator)

    const student = await Student.query()
      .preload('reservedSubjects', (query) => query.pivotColumns(['status', 'reservedAt']))
      .where('id', id)
      .firstOrFail()

    const { valid, invalidIds } = await this.subjectService.validateSubjects(
      subjectIds,
      student.courseId,
      student.id
    )

    if (!valid) {
      return response.badRequest({
        errors: {
          subjectIds: ['Invalid subjects detected'],
        },
        meta: {
          invalidIds,
        },
      })
    }

    await student.related('reservedSubjects').attach(subjectIds)

    const reservedSubjects = await student.related('reservedSubjects').query()

    return serialize(SubjectTransformer.transform(reservedSubjects).useVariant('withExtras'))
  }

  async destroy({ request, serialize }: HttpContext) {
    const {
      params: { id, subjectId },
    } = await request.validateUsing(showStudentReservationValidator)

    const student = await Student.query()
      .preload('reservedSubjects', (query) => query.pivotColumns(['status', 'reservedAt']))
      .where('id', id)
      .firstOrFail()

    await student.related('reservedSubjects').detach([subjectId])

    const reservedSubjects = await student.related('reservedSubjects').query()

    return serialize(SubjectTransformer.transform(reservedSubjects).useVariant('withExtras'))
  }

  async cancel({ request, serialize }: HttpContext) {
    const {
      params: { id, subjectId },
    } = await request.validateUsing(showStudentReservationValidator)

    const student = await Student.query()
      .preload('reservedSubjects', (query) => query.pivotColumns(['status', 'reservedAt']))
      .where('id', id)
      .firstOrFail()

    await student.related('reservedSubjects').sync({
      [subjectId]: {
        status: 'cancelled',
      },
    })

    const reservedSubjects = await student.related('reservedSubjects').query()

    return serialize(SubjectTransformer.transform(reservedSubjects).useVariant('withExtras'))
  }
}
