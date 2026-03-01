import { CoursesParams, coursesQueryOptions } from '@/lib/query-options/courses-query-options'
import { QUERY_KEYS } from '@/lib/query-options/query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useQueryParams from './use-query-params'
import { SortDirection } from '@tanstack/react-table'
import { Pagination } from '@/lib/types/ui'
import { PER_PAGE_DEFAULT } from '@/lib/constants'
import { useMemo } from 'react'

export default function useCourses() {
  const { getParam } = useQueryParams<CoursesParams>()
  const queryClient = useQueryClient()
  const page = getParam<number>('page', 1)
  const perPage = getParam<number>('perPage', PER_PAGE_DEFAULT)
  const code = getParam<string>('code')
  const name = getParam<string>('name')
  const sortBy = getParam<string>('sortBy')
  const sortOrder = getParam<SortDirection>('sortOrder')

  const { data, isLoading } = useQuery(
    coursesQueryOptions({ page, perPage, code, name, sortBy, sortOrder })
  )

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.COURSES],
    })
  }

  const pagination = useMemo(() => {
    let meta: Pagination = {
      currentPage: page!,
      lastPage: 1,
      total: 1,
      perPage: perPage!,
    }

    if (data?.metadata) {
      const { currentPage, lastPage, total, perPage } = data.metadata
      meta = {
        currentPage: Number(currentPage),
        lastPage: Number(lastPage),
        total: Number(total),
        perPage: Number(perPage),
      }
    }

    return meta
  }, [data?.metadata])

  return { courses: data?.data ?? [], pagination, isLoading, invalidate }
}
