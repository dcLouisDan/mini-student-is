import vine from '@vinejs/vine'
import { SORT_ORDER_ARR } from '../../lib/constants.ts'
import { existsRule } from './rules/exists.ts'
import { StudentSchema } from '#database/schema'

const SORTABLE_COLUMNS: Array<(typeof StudentSchema.$columns)[number]> = [
  'courseId',
  'createdAt',
  'firstName',
  'lastName',
  'studentNo',
]

export const indexStudentValidator = vine.create({
  qs: vine.object({
    page: vine.number().nonNegative().withoutDecimals().optional(),
    perPage: vine.number().nonNegative().withoutDecimals().optional(),
    courseId: vine.string().optional(),
    sortBy: vine.string().in(SORTABLE_COLUMNS),
    sortOrder: vine.string().in(SORT_ORDER_ARR),
    firstName: vine.string().optional(),
    lastName: vine.string().optional(),
    studentNo: vine.string().optional(),
  }),
})

const studentValidatorBase = {
  courseId: vine.string().use(existsRule({ table: 'courses', column: 'id' })),
  firstName: vine.string(),
  lastName: vine.string(),
  email: vine.string().email(),
  birthDate: vine.date(),
}

export const createStudentValidator = vine.create(studentValidatorBase)

export const updateStudentValidator = vine.create({
  ...studentValidatorBase,
  params: vine.object({
    id: vine.string(),
  }),
})

export const showStudentValidator = vine.create({
  params: vine.object({
    id: vine.string(),
  }),
})

export const showStudentReservationValidator = vine.create({
  params: vine.object({
    id: vine.string(),
    subjectId: vine.string(),
  }),
})

export const attachStudentReservationValidator = vine.create({
  params: vine.object({
    id: vine.string(),
  }),
  subjectIds: vine.array(vine.string()),
})
