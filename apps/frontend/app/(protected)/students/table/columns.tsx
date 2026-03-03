'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { Data } from '@api-starter-kit/backend/data'
import { Button, buttonVariants } from '@/components/ui/button'
import { Edit, Eye, PencilOff, Save, Trash2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { ConfirmationDialog } from '@/components/confirmation-dialog'
import useStudents from '@/hooks/use-students'
import CourseCombobox from '@/components/comboboxes/course-combobox'
import Link from 'next/link'

export const columns: ColumnDef<Data.Student>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
          {isEditing ? (
            <Button
              title="Save changes"
              size="icon-sm"
              variant={isEditing ? 'default' : 'ghost'}
              onClick={handleSubmit(async (data) => {
                if (!onRowSubmit) return
                const success = await onRowSubmit(data)

                if (success) {
                  setEditingRowId?.(null)
                  toast.success('Student updated')
                }
              })}
            >
              <Save />
            </Button>
          ) : (
            <Link
              title="View details"
              href={`/students/${item.id}`}
              className={buttonVariants({ variant: 'default', size: 'icon-sm' })}
            >
              <Eye />
            </Link>
          )}

          <Button
            title={!isEditing ? 'Edit' : 'Cancel'}
            size="icon-sm"
            variant={isEditing ? 'destructive' : 'ghost'}
            onClick={() => {
              setEditingRowId?.(isEditing ? null : row.original.id)
            }}
          >
            {!isEditing ? <Edit /> : <PencilOff />}
          </Button>

          <ConfirmationDialog
            title={`Delete student?`}
            description="All related records (students, grades) will also be deleted. Are you sure you want to proceed? Note: This action cannot be undone."
            triggerComponent={
              <Button title="Delete" size="icon-sm" variant="ghost" className="text-destructive">
                <Trash2 />
              </Button>
            }
            submitButtonContent="Delete"
            submitButtonVariant={{ variant: 'destructive' }}
            onSubmit={onStudentDelete}
          />
        </div>
      )
    },
  },
]
