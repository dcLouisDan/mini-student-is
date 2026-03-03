import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from './query-keys'
import { client } from '../api'

export const eligibleSubjectsQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [QUERY_KEYS.SUBJECTS, id, QUERY_KEYS.RESERVED_SUBJECTS, 'options'],
    queryFn: async () => {
      const res = await client.api.subjectReservations.eligibleSubjectsIndex({
        params: { id },
      })

      return res.data
    },
  })
