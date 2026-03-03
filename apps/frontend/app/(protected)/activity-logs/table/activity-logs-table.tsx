'use client'

import { columns } from './columns'
import useActivityLogs from '@/hooks/use-activity-logs'
import { PaginationBar } from '@/components/pagination-bar'
import SortPopover from '@/components/sort-popover'
import DebouncedInput from '@/components/debounced-input'
import useQueryParams from '@/hooks/use-query-params'
import { ActivityLogsParams } from '@/lib/query-options/activity-logs-query-options'
import { Field, FieldLabel } from '@/components/ui/field'
import { EditableDataTable } from '@/components/editable-data-table'
import { Data } from '@api-starter-kit/backend/data'
import { toast } from 'sonner'
import { DataTable } from '@/components/data-table'

export default function ActivityLogsTable() {
  const {
    activitylogs,
    pagination: { total, currentPage, perPage },
    sortByOptions,
    sortBy,
    sortOrder,
    name,
    modelId,
    modelType,
    event,
    entityId,
    entityType,
    description,
  } = useActivityLogs()

  const { updateParams } = useQueryParams<ActivityLogsParams>()

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-2 justify-end  border rounded-lg p-2 bg-secondary">
        <Field orientation="horizontal">
          <FieldLabel>Activity Log Description</FieldLabel>
          <DebouncedInput
            value={description ?? ''}
            onChange={(value) => {
              updateParams({ description: value as string })
            }}
            placeholder="Search by activity log description..."
          />
        </Field>
        <Field orientation="horizontal">
          <FieldLabel>ActivityLog Event</FieldLabel>
          <DebouncedInput
            value={name ?? ''}
            onChange={(value) => {
              updateParams({ event: value as string })
            }}
            placeholder="Search by activity log event..."
          />
        </Field>
        <div className="flex items-center gap-2">
          <PaginationBar total={total} page={currentPage} size={perPage} />
          <SortPopover
            sortableOptions={sortByOptions}
            sortValue={sortBy}
            directionValue={sortOrder}
          />
        </div>
      </div>
      <DataTable data={activitylogs} columns={columns} />
    </>
  )
}
