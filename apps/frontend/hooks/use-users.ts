import { UsersParams, usersQueryOptions } from '@/lib/query-options/users-query-options'
import { QUERY_KEYS } from '@/lib/query-options/query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useQueryParams from './use-query-params'
import { SortDirection } from '@tanstack/react-table'
import { Pagination } from '@/lib/types/ui'
import { PER_PAGE_DEFAULT } from '@/lib/constants'
import { useMemo } from 'react'
import { stringArrToBasicSelectItems } from '@/components/basic-select'
import { camelCaseToTitleCase } from '@/lib/utils'
import { handleRequestError } from '@/components/handle-request-error'
import { client } from '@/lib/api'

export type UserFormInputs = {
  id: string
  fullName: string
  email: string
  password?: string
  passwordConfirmation?: string
  role: string
}

const sortableColumns = ['createdAt', 'role', 'name'] as const
const sortByOptions = stringArrToBasicSelectItems(Array.from(sortableColumns), camelCaseToTitleCase)

export default function useUsers() {
  const { getParam } = useQueryParams<UsersParams>()
  const queryClient = useQueryClient()
  const page = getParam<number>('page', 1)
  const perPage = getParam<number>('perPage', PER_PAGE_DEFAULT)
  const role = getParam<string>('role')
  const name = getParam<string>('name')
  const sortBy = getParam<string>('sortBy')
  const sortOrder = getParam<SortDirection>('sortOrder')

  const { data, isLoading } = useQuery(
    usersQueryOptions({ page, perPage, role, name, sortBy, sortOrder })
  )

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.USERS],
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

  const updateUser = async (data: UserFormInputs) => {
    try {
      await client.api.users.update({
        params: {
          id: data.id,
        },
        body: {
          role: data.role,
          fullName: data.fullName ?? '',
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
          email: data.email,
        },
      })

      invalidate()
      return true
    } catch (e) {
      handleRequestError(e)
      return false
    }
  }

  const deleteUser = async (id: string) => {
    try {
      await client.api.users.destroy({
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

  const batchDeleteUser = async (idArr: string[]) => {
    try {
      await client.api.users.batchDestroy({
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
    users: data?.data ?? [],
    pagination,
    isLoading,
    invalidate,
    sortByOptions,
    sortableColumns,
    sortBy,
    sortOrder,
    role,
    name,
    updateUser,
    deleteUser,
    batchDeleteUser,
  }
}
