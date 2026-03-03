'use client'

import { columns } from './columns'
import useGrades from '@/hooks/use-grades'
import { PaginationBar } from '@/components/pagination-bar'
import SortPopover from '@/components/sort-popover'
import useQueryParams from '@/hooks/use-query-params'
import { GradesParams } from '@/lib/query-options/grades-query-options'
import { useForm } from 'react-hook-form'
import { DataTable } from '@/components/data-table'
import SubjectCombobox from '@/components/comboboxes/subject-combobox'

export default function GradesTable() {
  const {
    grades,
    pagination: { total, currentPage, perPage },
    sortByOptions,
    sortBy,
    subjectId,
    sortOrder,
  } = useGrades()

  const { updateParams } = useQueryParams<GradesParams>()

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-2 justify-end  border rounded-lg p-2 bg-secondary">
        <SubjectCombobox
          value={subjectId ?? ''}
          onValueChange={(val) => updateParams({ subjectId: val })}
        />
        <div className="flex items-center gap-2">
          <PaginationBar total={total} page={currentPage} size={perPage} />
          <SortPopover
            sortableOptions={sortByOptions}
            sortValue={sortBy}
            directionValue={sortOrder}
          />
        </div>
      </div>
      <DataTable data={grades} columns={columns} />
    </>
  )
}
