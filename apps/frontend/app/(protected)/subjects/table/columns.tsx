'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { Data } from '@api-starter-kit/backend/data'
import { Button } from '@/components/ui/button'
import { Edit, PencilOff, Save, Trash2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { ConfirmationDialog } from '@/components/confirmation-dialog'
import useSubjects from '@/hooks/use-subjects'
import { Input } from '@/components/ui/input'
import CourseCombobox from '@/components/comboboxes/course-combobox'

export const columns: ColumnDef<Data.Subject>[] = [
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
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row, table }) => {
      const item = row.original
      const isEditing = table.options.meta?.editingRowId === row.original.id
      const { register } = useFormContext<Data.Subject>()

      if (isEditing) {
        return <Textarea {...register('code')} />
      }

      return <div>{item.code}</div>
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row, table }) => {
      const item = row.original
      const isEditing = table.options.meta?.editingRowId === row.original.id
      const { register } = useFormContext<typeof item>()

      if (isEditing) {
        return <Textarea {...register('title')} />
      }

      return <div>{item.title}</div>
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
    accessorKey: 'units',
    header: 'Units',
    cell: ({ row, table }) => {
      const item = row.original
      const isEditing = table.options.meta?.editingRowId === row.original.id
      const { register } = useFormContext<typeof item>()

      if (isEditing) {
        return <Input type="number" {...register('units')} />
      }

      return <div>{item.units}</div>
    },
  },
  {
    accessorKey: 'passingGrade',
    header: 'Passing Grade',
    cell: ({ row, table }) => {
      const item = row.original
      const isEditing = table.options.meta?.editingRowId === row.original.id
      const { register } = useFormContext<typeof item>()

      if (isEditing) {
        return <Input type="number" {...register('passingGrade')} />
      }

      return <div>{item.passingGrade}</div>
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
      const { deleteSubject } = useSubjects()
      const onSubjectDelete = async () => {
        const success = await deleteSubject(item.id)

        if (success) {
          toast.success(`Subject deleted.`)
        }
      }
      return (
        <div className="flex items-center gap-1">
          {isEditing && (
            <Button
              title="Save changes"
              size="icon-sm"
              variant={isEditing ? 'default' : 'ghost'}
              onClick={handleSubmit(async (data) => {
                if (!onRowSubmit) return
                const success = await onRowSubmit(data)

                if (success) {
                  setEditingRowId?.(null)
                  toast.success('Subject updated')
                }
              })}
            >
              <Save />
            </Button>
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
            title={`Delete subject?`}
            description="All related records (students, grades) will also be deleted. Are you sure you want to proceed? Note: This action cannot be undone."
            triggerComponent={
              <Button title="Delete" size="icon-sm" variant="ghost" className="text-destructive">
                <Trash2 />
              </Button>
            }
            submitButtonContent="Delete"
            submitButtonVariant={{ variant: 'destructive' }}
            onSubmit={onSubjectDelete}
          />
        </div>
      )
    },
  },
]
