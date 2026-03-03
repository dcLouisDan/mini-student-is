import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from './query-keys'
import { client } from '../api'
import { BaseParams } from '../types/ui'

export interface GradesParams extends BaseParams {
  courseId?: string
  studentId?: string
  subjectId?: string
  remarks?: string
  encodedByUserId?: string
  sortByStudent?: string
  sortOrderStudent?: string
}

export const gradesQueryOptions = (params: GradesParams) =>
  queryOptions({
    queryKey: [QUERY_KEYS.GRADES].concat(Object.values(params)),
    queryFn: async () => {
      return await client.api.grades.index({
        query: {
          qs: params,
        },
      })
    },
  })
