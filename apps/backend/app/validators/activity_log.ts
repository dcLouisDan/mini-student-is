import { ActivityLogSchema } from '#database/schema'
import vine from '@vinejs/vine'
import { SORT_ORDER_ARR } from '../../lib/constants.ts'

const SORTABLE_COLUMNS: Array<(typeof ActivityLogSchema.$columns)[number]> = [
  'createdAt',
  'name',
  'modelType',
  'modelId',
  'event',
  'entityType',
  'entityId',
]

export const indexActivityLogValidator = vine.create({
  qs: vine.object({
    page: vine.number().nonNegative().withoutDecimals().optional(),
    perPage: vine.number().nonNegative().withoutDecimals().optional(),
    name: vine.string().optional(),
    modelType: vine.string().optional(),
    modelId: vine.string().optional(),
    event: vine.string().optional(),
    entityType: vine.string().optional(),
    entityId: vine.string().optional(),
    description: vine.string().optional(),
    sortBy: vine.string().in(SORTABLE_COLUMNS).optional(),
    sortOrder: vine.string().in(SORT_ORDER_ARR).optional(),
  }),
})
