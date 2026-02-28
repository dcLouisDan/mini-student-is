import vine from '@vinejs/vine'

import { SORT_ORDER_ARR } from '../../lib/constants.ts'
import { GradeSchema } from '#database/schema'
import { existsRule } from './rules/exists.ts'

const SORTABLE_COLUMNS: Array<(typeof GradeSchema.$columns)[number]> = [
  'courseId',
  'studentId',
  'subjectId',
  'prelim',
  'midterm',
  'finals',
  'finalGrade',
  'encodedByUserId',
  'createdAt',
]

export const indexGradeValidator = vine.create({
  qs: vine.object({
    page: vine.number().nonNegative().withoutDecimals().optional(),
    perPage: vine.number().nonNegative().withoutDecimals().optional(),
    studentId: vine.string().use(existsRule({ table: 'student', column: 'id' })),
    subjectId: vine.string().use(existsRule({ table: 'subject', column: 'id' })),
    courseId: vine.string().optional(),
    sortBy: vine.string().in(SORTABLE_COLUMNS),
    sortOrder: vine.string().in(SORT_ORDER_ARR),
  }),
})

const upsertGradeSchema = vine.object({
  studentId: vine.string().use(existsRule({ table: 'student', column: 'id' })),
  subjectId: vine.string().use(existsRule({ table: 'subject', column: 'id' })),
  courseId: vine.string().use(existsRule({ table: 'course', column: 'id' })),
  prelim: vine.number(),
  midterm: vine.number(),
  finals: vine.number(),
  finalGrade: vine.number(),
  remarks: vine.string(),
  encodedByUserId: vine.string().use(existsRule({ table: 'users', column: 'id' })),
})

export const upsertGradeValidator = vine.create({
  params: vine.object({
    id: vine.string(),
  }),
  gradeRecord: upsertGradeSchema,
})

export const groupUpsertGradeValidator = vine.create({
  gradeRecords: vine.array(upsertGradeSchema),
})
