'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Data } from '@api-starter-kit/backend/data'

export const columns: ColumnDef<Data.Grade>[] = [
  {
    id: 'courseCode',
    header: 'Course Code',
    accessorFn: (row) => row.course?.code,
  },
  {
    id: 'subjectCode',
    header: 'Subject Code',
    accessorFn: (row) => row.subject?.code,
  },
  {
    id: 'studentNo',
    header: 'Student No.',
    accessorFn: (row) => row.student?.studentNo,
  },
  {
    id: 'studentName',
    header: 'Student Name',
    accessorFn: (row) => `${row.student?.lastName}, ${row.student?.firstName}`,
  },
  {
    accessorKey: 'prelim',
    header: 'Prelim',
  },
  {
    accessorKey: 'midterm',
    header: 'Midterm',
  },
  {
    accessorKey: 'finals',
    header: 'Finals',
  },
  {
    accessorKey: 'finalGrade',
    header: 'Final Grade',
  },
  {
    id: 'passingGrade',
    header: 'PassingGrade',
    accessorFn: (row) => row.subject?.passingGrade,
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks',
  },
  {
    id: 'encodedBy',
    header: 'Endcoded By',
    accessorFn: (row) => row.encodedBy?.fullName,
  },
]
