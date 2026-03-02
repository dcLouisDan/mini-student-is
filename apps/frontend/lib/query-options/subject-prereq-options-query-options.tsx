import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from './query-keys'
import { client } from '../api'

export const subjectPrereqOptionsQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [QUERY_KEYS.SUBJECTS, id, QUERY_KEYS.PREREQ_SUBJECTS, 'options'],
    queryFn: async () => {
      const res = await client.api.subjectPrerequisites.prereqOptionsIndex({
        params: { id },
      })

      return res.data
    },
  })
