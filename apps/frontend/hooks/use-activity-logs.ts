import {
  ActivityLogsParams,
  activitylogsQueryOptions,
} from '@/lib/query-options/activity-logs-query-options'
import { QUERY_KEYS } from '@/lib/query-options/query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useQueryParams from './use-query-params'
import { SortDirection } from '@tanstack/react-table'
import { Pagination } from '@/lib/types/ui'
import { PER_PAGE_DEFAULT } from '@/lib/constants'
import { useMemo } from 'react'
import { stringArrToBasicSelectItems } from '@/components/basic-select'
import { camelCaseToTitleCase } from '@/lib/utils'

const sortableColumns = [
  'createdAt',
  'name',
  'modelType',
  'modelId',
  'event',
  'entityType',
  'entityId',
] as const
const sortByOptions = stringArrToBasicSelectItems(Array.from(sortableColumns), camelCaseToTitleCase)

export default function useActivityLogs() {
  const { getParam } = useQueryParams<ActivityLogsParams>()
  const queryClient = useQueryClient()
  const page = getParam<number>('page', 1)
  const perPage = getParam<number>('perPage', PER_PAGE_DEFAULT)
  const name = getParam<string>('name')
  const sortBy = getParam<string>('sortBy')
  const sortOrder = getParam<SortDirection>('sortOrder', 'desc')
  const modelType = getParam<string>('modelType')
  const modelId = getParam<string>('modelId')
  const event = getParam<string>('event')
  const entityType = getParam<string>('entityType')
  const entityId = getParam<string>('entityId')
  const description = getParam<string>('description')

  const { data, isLoading } = useQuery(
    activitylogsQueryOptions({
      page,
      perPage,
      name,
      sortBy,
      sortOrder,
      modelId,
      modelType,
      event,
      entityId,
      entityType,
      description,
    })
  )

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.ACTIVITY_LOGS],
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

  return {
    activitylogs: data?.data ?? [],
    pagination,
    isLoading,
    invalidate,
    sortByOptions,
    sortableColumns,
    sortBy,
    sortOrder,
    name,
    modelId,
    modelType,
    event,
    entityId,
    entityType,
    description,
  }
}
