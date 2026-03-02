import vine from '@vinejs/vine'
import { SORT_ORDER_ARR } from '../../lib/constants.ts'
import { uniqueRule } from './rules/unique.ts'
import { existsRule } from './rules/exists.ts'
import { SubjectSchema } from '#database/schema'

const SORTABLE_COLUMNS: Array<(typeof SubjectSchema.$columns)[number]> = [
  'courseId',
  'createdAt',
  'code',
  'title',
  'units',
]

export const indexSubjectValidator = vine.create({
  qs: vine.object({
    page: vine.number().nonNegative().withoutDecimals().optional(),
    perPage: vine.number().nonNegative().withoutDecimals().optional(),
    courseId: vine.string().optional(),
    sortBy: vine.string().in(SORTABLE_COLUMNS).optional(),
    sortOrder: vine.string().in(SORT_ORDER_ARR).optional(),
    code: vine.string().optional(),
    title: vine.string().optional(),
  }),
})

const subjectValidatorBase = {
  courseId: vine.string().use(existsRule({ table: 'courses', column: 'id' })),
  code: vine.string(),
  title: vine.string(),
  units: vine.number().nonNegative().withoutDecimals(),
  passingGrade: vine.number().nonNegative(),
}

export const createSubjectValidator = vine.create({
  ...subjectValidatorBase,
  code: vine.string().use(uniqueRule({ table: 'subjects', column: 'code' })),
})

export const updateSubjectValidator = vine.create({
  ...subjectValidatorBase,
  params: vine.object({
    id: vine.string(),
  }),
})

export const showSubjectValidator = vine.create({
  params: vine.object({
    id: vine.string(),
  }),
})

export const showSubjectPrerequisiteValidator = vine.create({
  params: vine.object({
    id: vine.string(),
    prerequisiteSubjectId: vine.string().use(existsRule({ table: 'subjects', column: 'id' })),
  }),
})

export const attachSubjectPrerequisiteValidator = vine.create({
  params: vine.object({
    id: vine.string(),
  }),
  prerequisiteSubjectId: vine.string().use(existsRule({ table: 'subjects', column: 'id' })),
})

export const batchSubjectsDeleteValidator = vine.create({
  idArr: vine.array(vine.string().use(existsRule({ table: 'subjects', column: 'id' }))),
})
