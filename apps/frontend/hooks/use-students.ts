import { StudentsParams, studentsQueryOptions } from '@/lib/query-options/students-query-options'
import { QUERY_KEYS } from '@/lib/query-options/query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useQueryParams from './use-query-params'
import { SortDirection } from '@tanstack/react-table'
import { Pagination } from '@/lib/types/ui'
import { PER_PAGE_DEFAULT } from '@/lib/constants'
import { useMemo } from 'react'
import { stringArrToBasicSelectItems } from '@/components/basic-select'
import { camelCaseToTitleCase, dateToFormatedString } from '@/lib/utils'
import { Data } from '@api-starter-kit/backend/data'
import { handleRequestError } from '@/components/handle-request-error'
import { client } from '@/lib/api'

const sortableColumns = ['courseId', 'createdAt', 'firstName', 'lastName', 'studentNo'] as const
const sortByOptions = stringArrToBasicSelectItems(Array.from(sortableColumns), camelCaseToTitleCase)

export default function useStudents({ defaultSubjectId }: { defaultSubjectId?: string } = {}) {
  const { getParam } = useQueryParams<StudentsParams>()
  const queryClient = useQueryClient()
  const page = getParam<number>('page', 1)
  const perPage = getParam<number>('perPage', PER_PAGE_DEFAULT)
  const courseId = getParam<string>('courseId')
  const studentNo = getParam<string>('studentNo')
  const firstName = getParam<string>('firstName')
  const lastName = getParam<string>('lastName')
  const sortBy = getParam<string>('sortBy')
  const sortOrder = getParam<SortDirection>('sortOrder')
  const subjectId = defaultSubjectId

  const { data, isLoading } = useQuery(
    studentsQueryOptions({
      page,
      perPage,
      firstName,
      lastName,
      sortBy,
      sortOrder,
      courseId,
      subjectId,
    })
  )

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.STUDENTS],
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

  const updateStudent = async (data: Data.Student) => {
    try {
      await client.api.students.update({
        params: {
          id: data.id,
        },
        body: {
          courseId: data.courseId,
          firstName: data.firstName ?? '',
          lastName: data.lastName ?? '',
          email: data.email ?? '',
          birthDate: dateToFormatedString(data.birthDate ?? ''),
        },
      })

      invalidate()
      return true
    } catch (e) {
      handleRequestError(e)
      return false
    }
  }

  const deleteStudent = async (id: string) => {
    try {
      await client.api.students.destroy({
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

  const batchDeleteStudent = async (idArr: string[]) => {
    try {
      await client.api.students.batchDestroy({
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
    students: data?.data ?? [],
    pagination,
    isLoading,
    invalidate,
    sortByOptions,
    sortableColumns,
    sortBy,
    sortOrder,
    firstName,
    lastName,
    updateStudent,
    deleteStudent,
    batchDeleteStudent,
    courseId,
    studentNo,
  }
}
