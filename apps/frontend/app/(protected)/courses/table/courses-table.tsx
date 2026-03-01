'use client'

import { DataTable } from '@/components/data-table'
import { columns } from './columns'
import useCourses from '@/hooks/use-courses'
import { PaginationBar } from '@/components/pagination-bar'

export default function CoursesTable() {
  const {
    courses,
    pagination: { total, currentPage, perPage },
  } = useCourses()
  return (
    <>
      <PaginationBar total={total} page={currentPage} size={perPage} />
      <DataTable data={courses} columns={columns} />
    </>
  )
}
