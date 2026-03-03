'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Data } from '@api-starter-kit/backend/data'
import { buttonVariants } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import useStudents from '@/hooks/use-students'
import CourseCombobox from '@/components/comboboxes/course-combobox'
import Link from 'next/link'

export const columns: ColumnDef<Data.Student>[] = [
  {
    accessorKey: 'studentNo',
    header: 'Student No.',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    cell: ({ row, table }) => {
      const item = row.original
      const isEditing = table.options.meta?.editingRowId === row.original.id
      const { register } = useFormContext<typeof item>()

      if (isEditing) {
        return <Textarea {...register('lastName')} />
      }

      return <div>{item.lastName}</div>
    },
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    cell: ({ row, table }) => {
      const item = row.original
      const isEditing = table.options.meta?.editingRowId === row.original.id
      const { register } = useFormContext<typeof item>()

      if (isEditing) {
        return <Textarea {...register('firstName')} />
      }

      return <div>{item.firstName}</div>
    },
  },
  {
    accessorKey: 'courseId',
    header: 'Course',
    cell: ({ row, table }) => {
      const item = row.original
      const isEditing = table.options.meta?.editingRowId === row.original.id
      const { watch, setValue } = useFormContext<typeof item>()

      if (isEditing) {
        return (
          <CourseCombobox
            value={watch('courseId')}
            onValueChange={(item) => setValue('courseId', item)}
          />
        )
      }
      return <div>{item.course?.name}</div>
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => {
      const item = row.original
      const isEditing = table.options.meta?.editingRowId === item.id
      const onRowSubmit = table.options.meta?.onRowSubmit
      const setEditingRowId = table.options.meta?.setEditingRowId
      const { handleSubmit } = useFormContext<typeof item>()
      const { deleteStudent } = useStudents()
      const onStudentDelete = async () => {
        const success = await deleteStudent(item.id)

        if (success) {
          toast.success(`Student deleted.`)
        }
      }
      return (
        <div className="flex items-center gap-1">
          <Link
            title="View details"
            href={`/students/${item.id}`}
            className={buttonVariants({ variant: 'default', size: 'icon-sm' })}
          >
            <Eye />
          </Link>
        </div>
      )
    },
  },
]
