import { ActivityLogSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import User from './user.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ActivityLog extends ActivityLogSchema {
  @belongsTo(() => User, {
    foreignKey: 'modelId',
    localKey: 'id',
  })
  declare user: BelongsTo<typeof User>
}
