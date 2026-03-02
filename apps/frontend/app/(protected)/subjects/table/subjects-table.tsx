'use client'

import { columns } from './columns'
import { RowSelectionState } from '@tanstack/react-table'
import useSubjects from '@/hooks/use-subjects'
import { PaginationBar } from '@/components/pagination-bar'
import SortPopover from '@/components/sort-popover'
import DebouncedInput from '@/components/debounced-input'
import useQueryParams from '@/hooks/use-query-params'
import { SubjectsParams } from '@/lib/query-options/subjects-query-options'
import { Field, FieldLabel } from '@/components/ui/field'
import { EditableDataTable } from '@/components/editable-data-table'
import { Data } from '@api-starter-kit/backend/data'
import { toast } from 'sonner'
import CourseCombobox from '@/components/comboboxes/course-combobox'

export default function SubjectsTable() {
  const {
    subjects,
    pagination: { total, currentPage, perPage },
    sortByOptions,
    sortBy,
    sortOrder,
    code,
    title,
    updateSubject,
    batchDeleteSubject,
  } = useSubjects()

  const { updateParams } = useQueryParams<SubjectsParams>()
  const onRowSubmit = async (data: Data.Subject) => {
    return updateSubject(data)
  }

  const onSubjectBatchDelete = async (selectedRows: string[]) => {
    const success = await batchDeleteSubject(selectedRows)

    if (success) {
      toast.success(`${selectedRows.length} rows have been deleted.`)
    }
  }
  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-2 justify-end">
        <Field orientation="horizontal">
          <FieldLabel>Subject Code</FieldLabel>
          <DebouncedInput
            value={code ?? ''}
            onChange={(value) => {
              updateParams({ code: value as string })
            }}
            placeholder="Search by subject code..."
          />
        </Field>
        <Field orientation="horizontal">
          <FieldLabel>Subject Title</FieldLabel>
          <DebouncedInput
            value={title ?? ''}
            onChange={(value) => {
              updateParams({ title: value as string })
            }}
            placeholder="Search by subject title..."
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
        data={subjects}
        columns={columns}
        onBatchDelete={async (rows) => {
          const selected = rows.map((row) => row.original.id)

          await onSubjectBatchDelete(selected)
        }}
      />
    </>
  )
}
