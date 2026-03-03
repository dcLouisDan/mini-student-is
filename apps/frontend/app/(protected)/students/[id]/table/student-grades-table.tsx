'use client'

import { columns } from './columns'
import useGrades from '@/hooks/use-grades'
import { PaginationBar } from '@/components/pagination-bar'
import SortPopover from '@/components/sort-popover'
import { EditableDataTable } from '@/components/editable-data-table'
import { Data } from '@api-starter-kit/backend/data'

export default function StudentGradesTable({ studentId }: { studentId: string }) {
  const { grades, updateGrade } = useGrades({ defaultStudentId: studentId })

  const onRowSubmit = async (data: Data.Grade) => {
    return updateGrade(data)
  }

  return (
    <div className="space-y-4">
      <h4>Grade Records</h4>
      <EditableDataTable onRowSubmit={onRowSubmit} data={grades} columns={columns} />
    </div>
  )
}
