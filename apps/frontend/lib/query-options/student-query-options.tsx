import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from './query-keys'
import { client } from '../api'
import { BaseParams } from '../types/ui'

export const studentQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [QUERY_KEYS.STUDENTS, id],
    queryFn: async () => {
      const res = await client.api.students.show({
        params: { id },
      })

      return res.data
    },
  })
