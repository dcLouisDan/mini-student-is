'use client'

import { columns } from './columns'
import { RowSelectionState } from '@tanstack/react-table'
import useStudents from '@/hooks/use-students'
import { PaginationBar } from '@/components/pagination-bar'
import SortPopover from '@/components/sort-popover'
import DebouncedInput from '@/components/debounced-input'
import useQueryParams from '@/hooks/use-query-params'
import { StudentsParams } from '@/lib/query-options/students-query-options'
import { Field, FieldLabel } from '@/components/ui/field'
import { EditableDataTable } from '@/components/editable-data-table'
import { Data } from '@api-starter-kit/backend/data'
import { toast } from 'sonner'
import CourseCombobox from '@/components/comboboxes/course-combobox'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function StudentsTable() {
  const {
    students,
    pagination: { total, currentPage, perPage },
    sortByOptions,
    sortBy,
    sortOrder,
    updateStudent,
    batchDeleteStudent,
    courseId,
    firstName,
    lastName,
    studentNo,
  } = useStudents()

  const { updateParams } = useQueryParams<StudentsParams>()
  const onRowSubmit = async (data: Data.Student) => {
    return updateStudent(data)
  }

  const onStudentBatchDelete = async (selectedRows: string[]) => {
    const success = await batchDeleteStudent(selectedRows)

    if (success) {
      toast.success(`${selectedRows.length} rows have been deleted.`)
    }
  }
  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-2 justify-end border rounded-lg p-2 bg-secondary">
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex flex-col md:flex-row items-center gap-2 justify-end">
            <Field orientation="horizontal">
              <DebouncedInput
                value={lastName ?? ''}
                onChange={(value) => {
                  updateParams({ lastName: value as string })
                }}
                placeholder="Search by student's last name..."
              />
            </Field>
            <Field orientation="horizontal">
              <DebouncedInput
                value={firstName ?? ''}
                onChange={(value) => {
                  updateParams({ firstName: value as string })
                }}
                placeholder="Search by student's first name..."
              />
            </Field>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <SortPopover
                className="min-w-40"
                sortableOptions={sortByOptions}
                sortValue={sortBy}
                directionValue={sortOrder}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 justify-end">
            <Field orientation="horizontal">
              <DebouncedInput
                value={studentNo ?? ''}
                onChange={(value) => {
                  updateParams({ studentNo: value as string })
                }}
                placeholder="Search by student number..."
              />
            </Field>
            <div className="min-w-60 flex gap-2 items-center overflow-hidden relative">
              <CourseCombobox
                value={courseId ?? ''}
                onValueChange={(value) => updateParams({ courseId: value })}
              />
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute right-1"
                onClick={() => updateParams({ courseId: undefined })}
              >
                <X />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <EditableDataTable
        onRowSubmit={onRowSubmit}
        data={students}
        columns={columns}
        onBatchDelete={async (rows) => {
          const selected = rows.map((row) => row.original.id)

          await onStudentBatchDelete(selected)
        }}
      />
      <div className="flex flex-col md:flex-row items-center gap-2 w-full justify-end">
        <PaginationBar total={total} page={currentPage} size={perPage} />
      </div>
    </>
  )
}
