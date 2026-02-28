import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from './query-keys'
import { client } from '../api'
import { SortOrderOption } from '../types/ui'

interface CoursesParams {
  page?: number
  perPage?: number
  sortBy?: string
  sortOrder?: SortOrderOption
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
