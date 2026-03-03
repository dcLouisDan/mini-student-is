'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { Data } from '@api-starter-kit/backend/data'
import { Button } from '@/components/ui/button'
import { Edit, PencilOff, Save, Trash2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { ConfirmationDialog } from '@/components/confirmation-dialog'
import useGrades from '@/hooks/use-grades'

export const columns: ColumnDef<Data.Grade>[] = [
  {
    id: 'subjectCode',
    header: 'Subject Code',
    accessorFn: (row) => row.subject?.code,
  },
  {
    id: 'subjectTitle',
    header: 'Subject Title',
    accessorFn: (row) => row.subject?.title,
  },
  {
    accessorKey: 'prelim',
    header: 'Prelim',
    cell: ({ row, table }) => {
      const item = row.original
      const isEditing = table.options.meta?.editingRowId === row.original.id
      const { register } = useFormContext<Data.Grade>()

      if (isEditing) {
        return <Input type="number" {...register('prelim')} />
      }

      return <div>{item.prelim}</div>
    },
  },
  {
    accessorKey: 'midterm',
    header: 'Midterm',
    cell: ({ row, table }) => {
      const item = row.original
      const isEditing = table.options.meta?.editingRowId === row.original.id
      const { register, watch } = useFormContext<typeof item>()

      if (isEditing) {
        return <Input type="number" {...register('midterm')} />
      }

      return <div>{item.midterm}</div>
    },
  },
  {
    accessorKey: 'finals',
    header: 'Finals',
    cell: ({ row, table }) => {
      const item = row.original
      const isEditing = table.options.meta?.editingRowId === row.original.id
      const { register } = useFormContext<typeof item>()

      if (isEditing) {
        return <Input type="number" {...register('finals')} />
      }

      return <div>{item.finals}</div>
    },
  },
  {
    accessorKey: 'finalGrade',
    header: 'Final Grade',
    cell: ({ row, table }) => {
      const item = row.original
      const isEditing = table.options.meta?.editingRowId === row.original.id
      const { register } = useFormContext<typeof item>()

      if (isEditing) {
        return <Input type="number" {...register('finalGrade')} />
      }

      return <div>{item.finalGrade}</div>
    },
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks',
    cell: ({ row, table }) => {
      const item = row.original
      const isEditing = table.options.meta?.editingRowId === row.original.id
      const { register } = useFormContext<typeof item>()

      if (isEditing) {
        return <Input {...register('remarks')} />
      }

      return <div>{item.remarks}</div>
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
      const { deleteGrade } = useGrades()
      const onGradeDelete = async () => {
        const success = await deleteGrade(item.id)

        if (success) {
          toast.success(`Grade deleted.`)
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
                  toast.success('Grade updated')
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
        </div>
      )
    },
  },
]
