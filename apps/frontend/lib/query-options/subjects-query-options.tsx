import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from './query-keys'
import { client } from '../api'
import { BaseParams } from '../types/ui'

export interface SubjectsParams extends BaseParams {
  title?: string
  code?: string
}

export const subjectsQueryOptions = (params: SubjectsParams) =>
  queryOptions({
    queryKey: [QUERY_KEYS.SUBJECTS].concat(Object.values(params)),
    queryFn: async () => {
      return await client.api.subjects.index({
        query: {
          qs: params,
        },
      })
    },
  })
