import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from './query-keys'
import { client } from '../api'
import { BaseParams } from '../types/ui'

export interface ActivityLogsParams extends BaseParams {
  name?: string
  modelType?: string
  modelId?: string
  event?: string
  entityType?: string
  entityId?: string
  description?: string
}

export const activitylogsQueryOptions = (params: ActivityLogsParams) =>
  queryOptions({
    queryKey: [QUERY_KEYS.ACTIVITY_LOGS].concat(Object.values(params)),
    queryFn: async () => {
      return await client.api.activityLogs.index({
        query: {
          qs: params,
        },
      })
    },
  })
