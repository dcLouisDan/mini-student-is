import { indexActivityLogValidator } from '#validators/activity_log'
import type { HttpContext } from '@adonisjs/core/http'
import { DEFAULT_PER_PAGE_LIMIT, SortOrder } from '../../lib/constants.ts'
import ActivityLogTransformer from '#transformers/activity_log_transformer'
import ActivityLog from '#models/activity_log'

export default class ActivityLogsController {
  async index({ serialize, request, response, auth: { user: authUser } }: HttpContext) {
    if (!authUser) {
      return response.unauthorized()
    }

    if (authUser.role !== 'admin') {
      return response.unauthorized()
    }

    const {
      qs: { page, perPage, sortBy, sortOrder, event, entityType, description },
    } = await request.validateUsing(indexActivityLogValidator)

    const sortColumn = sortBy ?? 'createdAt'
    const order: SortOrder = (sortOrder as SortOrder) ?? 'desc'
    const ilikeFilters = { description, event }
    const filters = { entityType }
    const activitylogsRaw = ActivityLog.query()

    Object.entries(filters).forEach(([key, value]) => {
      if (value) activitylogsRaw.where(key, value)
    })

    Object.entries(ilikeFilters).forEach(([key, value]) => {
      if (value) activitylogsRaw.orWhereILike(key, `%${value}%`)
    })

    const activitylogs = await activitylogsRaw
      .orderBy(sortColumn, order)
      .paginate(page ?? 1, perPage ?? DEFAULT_PER_PAGE_LIMIT)

    const data = activitylogs.all()
    const metadata = activitylogs.getMeta()

    return serialize(ActivityLogTransformer.paginate(data, metadata))
  }
}
