import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from './query-keys'
import { client } from '../api'
import { BaseParams } from '../types/ui'

export const subjectQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [QUERY_KEYS.SUBJECTS, id],
    queryFn: async () => {
      const res = await client.api.subjects.show({
        params: { id },
      })

      return res.data
    },
  })
