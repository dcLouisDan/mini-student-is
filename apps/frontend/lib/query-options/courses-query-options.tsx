import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from './query-keys'
import { client } from '../api'
import { BaseParams } from '../types/ui'

export interface CoursesParams extends BaseParams {
  name?: string
  code?: string
}

export const coursesQueryOptions = (params: CoursesParams) =>
  queryOptions({
    queryKey: [QUERY_KEYS.COURSES].concat(Object.values(params)),
    queryFn: async () => {
      return await client.api.courses.index({
        query: {
          qs: params,
        },
      })
    },
  })
