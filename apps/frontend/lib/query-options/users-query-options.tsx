import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from './query-keys'
import { client } from '../api'
import { BaseParams } from '../types/ui'

export interface UsersParams extends BaseParams {
  name?: string
  role?: string
}

export const usersQueryOptions = (params: UsersParams) =>
  queryOptions({
    queryKey: [QUERY_KEYS.USERS].concat(Object.values(params)),
    queryFn: async () => {
      return await client.api.users.index({
        query: {
          qs: params,
        },
      })
    },
  })
