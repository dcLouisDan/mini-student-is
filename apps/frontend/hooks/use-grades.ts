import { GradesParams, gradesQueryOptions } from '@/lib/query-options/grades-query-options'
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

const sortableColumns = [
  'courseId',
  'studentId',
  'subjectId',
  'prelim',
  'midterm',
  'finals',
  'finalGrade',
  'createdAt',
] as const
const sortByOptions = stringArrToBasicSelectItems(Array.from(sortableColumns), camelCaseToTitleCase)

export default function useGrades(
  subjectEditId?: string,
  defaultPageSize?: number,
  sortByStudent?: 'last_name' | 'first_name' | 'student_no',
  sortOrderStudent?: SortDirection,
  defaultStudentId?: string
) {
  const { getParam } = useQueryParams<GradesParams>()
  const queryClient = useQueryClient()
  const page = getParam<number>('page', 1)
  const perPage = defaultPageSize ?? getParam<number>('perPage', PER_PAGE_DEFAULT)
  const subjectId = subjectEditId ?? getParam<string>('subjectId')
  const studentId = defaultStudentId ?? getParam<string>('studentId')
  const remarks = getParam<string>('remarks')
  const sortBy = getParam<string>('sortBy')
  const sortOrder = getParam<SortDirection>('sortOrder')

  const { data, isLoading } = useQuery(
    gradesQueryOptions({
      page,
      perPage,
      subjectId,
      studentId,
      sortBy,
      sortOrder,
      remarks,
      sortByStudent,
      sortOrderStudent,
    })
  )

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GRADES],
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

  const updateGrade = async (data: Data.Grade) => {
    try {
      await client.api.grades.update({
        params: {
          id: data.id,
        },
        body: {
          id: data.id,
          studentId: data.studentId,
          subjectId: data.subjectId,
          courseId: data.courseId,
          prelim: data.prelim ?? 0,
          midterm: data.midterm ?? 0,
          finals: data.finals ?? 0,
          finalGrade: data.finalGrade ?? 0,
          remarks: data.remarks ?? '',
          encodedByUserId: data.encodedByUserId ?? '',
        },
      })

      invalidate()
      return true
    } catch (e) {
      handleRequestError(e)
      return false
    }
  }

  const deleteGrade = async (id: string) => {
    try {
      await client.api.grades.destroy({
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

  return {
    grades: data?.data ?? [],
    pagination,
    isLoading,
    invalidate,
    sortByOptions,
    sortableColumns,
    sortBy,
    sortOrder,
    subjectId,
    studentId,
    updateGrade,
    deleteGrade,
  }
}
