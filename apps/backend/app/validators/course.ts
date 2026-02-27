import vine from '@vinejs/vine'
import { SORT_ORDER_ARR } from '../../lib/constants.ts'
import { uniqueRule } from './rules/unique.ts'

const SORTABLE_COLUMNS = ['createdAt', 'code', 'name']

export const indexCourseValidator = vine.create({
  qs: vine.object({
    page: vine.number().nonNegative().withoutDecimals().optional(),
    perPage: vine.number().nonNegative().withoutDecimals().optional(),
    sortBy: vine.string().in(SORTABLE_COLUMNS),
    sortOrder: vine.string().in(SORT_ORDER_ARR),
  }),
})

const courseValidatorBase = {
  code: vine.string(),
  name: vine.string(),
  description: vine.string(),
}

export const createCourseValidator = vine.create({
  ...courseValidatorBase,
  code: vine.string().use(uniqueRule({ table: 'courses', column: 'code' })),
})

export const updateCourseValidator = vine.create({
  ...courseValidatorBase,
  params: vine.object({
    id: vine.string(),
  }),
})

export const showCourseValidator = vine.create({
  params: vine.object({
    id: vine.string(),
  }),
})
