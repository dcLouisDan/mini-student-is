import { SubjectsParams, subjectsQueryOptions } from '@/lib/query-options/subjects-query-options'
import { QUERY_KEYS } from '@/lib/query-options/query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useQueryParams from './use-query-params'
import { SortDirection } from '@tanstack/react-table'
import { Pagination } from '@/lib/types/ui'
import { PER_PAGE_DEFAULT } from '@/lib/constants'
import { useMemo } from 'react'
import { stringArrToBasicSelectItems } from '@/components/basic-select'
import { camelCaseToTitleCase } from '@/lib/utils'
import { Data } from '@api-starter-kit/backend/data'
import { handleRequestError } from '@/components/handle-request-error'
import { client } from '@/lib/api'

const sortableColumns = ['courseId', 'createdAt', 'code', 'title', 'units'] as const
const sortByOptions = stringArrToBasicSelectItems(Array.from(sortableColumns), camelCaseToTitleCase)

export default function useSubjects() {
  const { getParam } = useQueryParams<SubjectsParams>()
  const queryClient = useQueryClient()
  const page = getParam<number>('page', 1)
  const perPage = getParam<number>('perPage', PER_PAGE_DEFAULT)
  const code = getParam<string>('code')
  const courseId = getParam<string>('courseId')
  const title = getParam<string>('title')
  const sortBy = getParam<string>('sortBy')
  const sortOrder = getParam<SortDirection>('sortOrder')

  const { data, isLoading } = useQuery(
    subjectsQueryOptions({ page, perPage, code, title, sortBy, sortOrder, courseId })
  )

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.SUBJECTS],
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

  const updateSubject = async (data: Data.Subject) => {
    try {
      await client.api.subjects.update({
        params: {
          id: data.id,
        },
        body: {
          code: data.code,
          title: data.title ?? '',
          courseId: data.courseId,
          passingGrade: data.passingGrade,
          units: data.units,
        },
      })

      invalidate()
      return true
    } catch (e) {
      handleRequestError(e)
      return false
    }
  }

  const deleteSubject = async (id: string) => {
    try {
      await client.api.subjects.destroy({
        params: {
          id,
        },
      })

      invalidate()
      return true
    } catch (e) {
      handleRequestError(e)
      return false
    }
  }

  const batchDeleteSubject = async (idArr: string[]) => {
    try {
      await client.api.subjects.batchDestroy({
        body: { idArr },
      })

      invalidate()
      return true
    } catch (e) {
      handleRequestError(e)
      return false
    }
  }

  return {
    subjects: data?.data ?? [],
    pagination,
    isLoading,
    invalidate,
    sortByOptions,
    sortableColumns,
    sortBy,
    sortOrder,
    code,
    title,
    updateSubject,
    deleteSubject,
    batchDeleteSubject,
    courseId,
  }
}
