import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from './query-keys'
import { client } from '../api'
import { BaseParams } from '../types/ui'

export interface StudentsParams extends BaseParams {
  studentNo?: string
  firstName?: string
  lastName?: string
  courseId?: string
}

export const studentsQueryOptions = (params: StudentsParams) =>
  queryOptions({
    queryKey: [QUERY_KEYS.STUDENTS].concat(Object.values(params)),
    queryFn: async () => {
      return await client.api.students.index({
        query: {
          qs: params,
        },
      })
    },
  })
