'use client'

import { DataTable } from '@/components/data-table'
import { columns } from './columns'
import useCourses from '@/hooks/use-courses'
import { PaginationBar } from '@/components/pagination-bar'
import SortPopover from '@/components/sort-popover'

export default function CoursesTable() {
  const {
    courses,
    pagination: { total, currentPage, perPage },
    sortByOptions,
    sortBy,
    sortOrder,
  } = useCourses()
  return (
    <>
      <div className="flex items-center gap-2 justify-end">
        <PaginationBar total={total} page={currentPage} size={perPage} />
        <SortPopover
          sortableOptions={sortByOptions}
          sortValue={sortBy}
          directionValue={sortOrder}
        />
      </div>
      <DataTable data={courses} columns={columns} />
    </>
  )
}
