import Grade from '#models/grade'
import Student from '#models/student'
import Subject from '#models/subject'
import { SubjectService } from '#services/subject_service'
import SubjectTransformer from '#transformers/subject_transformer'
import {
  attachStudentReservationValidator,
  showStudentReservationValidator,
  showStudentValidator,
} from '#validators/student'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { ModelAttributes } from '@adonisjs/lucid/types/model'
import { activity } from '@holoyan/adonisjs-activitylog'

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

  async store({ request, serialize, response, auth: { user: authUser } }: HttpContext) {
    const {
      params: { id },
      subjectIds,
    } = await request.validateUsing(attachStudentReservationValidator)

    const student = await Student.query()
      .preload('reservedSubjects', (query) => query.pivotColumns(['status', 'reservedAt']))
      .where('id', id)
      .firstOrFail()

    const { valid, invalidIds, subjects } = await this.subjectService.validateSubjects(
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

    await db.transaction(async (trx) => {
      student.useTransaction(trx)
      await student.related('reservedSubjects').attach(subjectIds)

      await this.createGradeRecords(student, subjects)
    })

    const reservedSubjects = await student.related('reservedSubjects').query()

    if (authUser) {
      await activity()
        .by(authUser)
        .making('reserve-subjects')
        .havingCurrent({ id, subjectIds })
        .log('Student successfully reserved subjects')
    }

    return serialize(SubjectTransformer.transform(reservedSubjects).useVariant('withExtras'))
  }

  async destroy({ request, serialize, auth: { user: authUser } }: HttpContext) {
    const {
      params: { id, subjectId },
    } = await request.validateUsing(showStudentReservationValidator)

    const student = await Student.query()
      .preload('reservedSubjects', (query) => query.pivotColumns(['status', 'reservedAt']))
      .where('id', id)
      .firstOrFail()

    await student.related('reservedSubjects').detach([subjectId])

    const reservedSubjects = await student.related('reservedSubjects').query()

    if (authUser) {
      await activity()
        .by(authUser)
        .making('delete-reservation')
        .havingCurrent({ id, subjectId })
        .log('Student successfully removed reserved subject')
    }

    return serialize(SubjectTransformer.transform(reservedSubjects).useVariant('withExtras'))
  }

  async cancel({ request, serialize, auth: { user: authUser } }: HttpContext) {
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

    if (authUser) {
      await activity()
        .by(authUser)
        .making('cancel-reservation')
        .havingCurrent({ id, subjectId })
        .log('Student successfully canceled reserved subject')
    }

    return serialize(SubjectTransformer.transform(reservedSubjects).useVariant('withExtras'))
  }

  private async createGradeRecords(
    student: Student,
    subjects: Subject[],
    trx?: TransactionClientContract
  ) {
    const values: Partial<ModelAttributes<Grade>>[] = []

    for (const subject of subjects) {
      values.push({
        subjectId: subject.id,
        courseId: student.courseId,
      })
    }
    if (trx) {
      student.useTransaction(trx)
    }
    await student.related('grades').createMany(values)
  }
}
