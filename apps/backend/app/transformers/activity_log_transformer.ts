import { BaseTransformer } from '@adonisjs/core/transformers'
import ActivityLog from '#models/activity_log'

export default class ActivityLogTransformer extends BaseTransformer<ActivityLog> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'modelType',
      'modelId',
      'event',
      'entityType',
      'entityId',
      'description',
      'current',
      'previous',
      'createdAt',
    ])
  }
}
