'use client'

import { DataTable } from '@/components/data-table'
import { columns } from './columns'
import useCourses from '@/hooks/use-courses'

export default function CoursesTable() {
  const { courses } = useCourses()
  return (
    <>
      <DataTable data={courses} columns={columns} />
    </>
  )
}
