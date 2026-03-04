import { BaseTransformer } from '@adonisjs/core/transformers'
import ActivityLog from '#models/activity_log'
import UserTransformer from './user_transformer.ts'

export default class ActivityLogTransformer extends BaseTransformer<ActivityLog> {
  toObject() {
    return {
      ...this.pick(this.resource, [
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
      ]),
      user: UserTransformer.transform(this.whenLoaded(this.resource.user)),
    }
  }
}
