import { coursesQueryOptions } from '@/lib/query-options/courses-query-options'
import { QUERY_KEYS } from '@/lib/query-options/query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function useCourses() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery(coursesQueryOptions({ page: 1 }))

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.COURSES],
    })
  }

  return { courses: data?.data ?? [], pagination: data?.metadata, isLoading, invalidate }
}
