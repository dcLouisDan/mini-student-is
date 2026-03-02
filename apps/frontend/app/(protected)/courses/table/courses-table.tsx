'use client'

import { columns } from './columns'
import { RowSelectionState } from '@tanstack/react-table'
import useCourses from '@/hooks/use-courses'
import { PaginationBar } from '@/components/pagination-bar'
import SortPopover from '@/components/sort-popover'
import DebouncedInput from '@/components/debounced-input'
import useQueryParams from '@/hooks/use-query-params'
import { CoursesParams } from '@/lib/query-options/courses-query-options'
import { Field, FieldLabel } from '@/components/ui/field'
import { EditableDataTable } from '@/components/editable-data-table'
import { Data } from '@api-starter-kit/backend/data'
import TableSelectionBar from '@/components/table-selection-bar'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ConfirmationDialog } from '@/components/confirmation-dialog'

export default function CoursesTable() {
  const {
    courses,
    pagination: { total, currentPage, perPage },
    sortByOptions,
    sortBy,
    sortOrder,
    code,
    name,
    updateCourse,
    batchDeleteCourse,
  } = useCourses()

  const { updateParams } = useQueryParams<CoursesParams>()
  const onRowSubmit = async (data: Data.Course) => {
    return updateCourse(data)
  }

  const onCourseBatchDelete = async (selectedRows: string[]) => {
    const success = await batchDeleteCourse(selectedRows)

    if (success) {
      toast.success(`${selectedRows.length} rows have been deleted.`)
    }
  }
  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-2 justify-end">
        <Field orientation="horizontal">
          <FieldLabel>Course Code</FieldLabel>
          <DebouncedInput
            value={code ?? ''}
            onChange={(value) => {
              updateParams({ code: value as string })
            }}
            placeholder="Search by course code..."
          />
        </Field>
        <Field orientation="horizontal">
          <FieldLabel>Course Name</FieldLabel>
          <DebouncedInput
            value={name ?? ''}
            onChange={(value) => {
              updateParams({ name: value as string })
            }}
            placeholder="Search by course name..."
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
      <EditableDataTable
        onRowSubmit={onRowSubmit}
        data={courses}
        columns={columns}
        onBatchDelete={async (rows) => {
          const selected = rows.map((row) => row.original.id)

          await onCourseBatchDelete(selected)
        }}
      />
    </>
  )
}
