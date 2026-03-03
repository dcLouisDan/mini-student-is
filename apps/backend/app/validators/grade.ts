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
    studentId: vine
      .string()
      .use(existsRule({ table: 'students', column: 'id' }))
      .optional(),
    subjectId: vine
      .string()
      .use(existsRule({ table: 'subjects', column: 'id' }))
      .optional(),
    courseId: vine.string().optional(),
    sortBy: vine.string().in(SORTABLE_COLUMNS).optional(),
    sortOrder: vine.string().in(SORT_ORDER_ARR).optional(),
    sortByStudent: vine.string().in(['last_name', 'first_name', 'student_no']).optional(),
    sortOrderStudent: vine.string().in(SORT_ORDER_ARR).optional(),
  }),
})

const upsertGradeSchema = {
  id: vine.string().use(existsRule({ table: 'grades', column: 'id' })),
  studentId: vine.string().use(existsRule({ table: 'students', column: 'id' })),
  subjectId: vine.string().use(existsRule({ table: 'subjects', column: 'id' })),
  courseId: vine.string().use(existsRule({ table: 'courses', column: 'id' })),
  prelim: vine.number(),
  midterm: vine.number(),
  finals: vine.number(),
  finalGrade: vine.number(),
  remarks: vine.string().optional(),
  encodedByUserId: vine.string().use(existsRule({ table: 'users', column: 'id' })),
}

export const upsertGradeValidator = vine.create({
  params: vine.object({
    id: vine.string(),
  }),
  ...upsertGradeSchema,
})

export const groupUpsertGradeValidator = vine.create({
  gradeRecords: vine.array(vine.object(upsertGradeSchema)),
})
