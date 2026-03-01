'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { Data } from '@api-starter-kit/backend/data'
import { Button } from '@/components/ui/button'
import { Edit, PencilOff, Save, Trash2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export const columns: ColumnDef<Data.Course>[] = [
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
      const { register } = useFormContext<Data.Course>()

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
      const { register, watch } = useFormContext<typeof item>()

      if (isEditing) {
        return <Textarea {...register('name')} />
      }

      return <div>{item.name}</div>
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row, table }) => {
      const item = row.original
      const isEditing = table.options.meta?.editingRowId === row.original.id
      const { register } = useFormContext<typeof item>()

      if (isEditing) {
        return <Textarea {...register('description')} />
      }

      return <div>{item.description}</div>
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
                  toast.success('Course updated')
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
          <Button title="Delete" size="icon-sm" variant="ghost" className="text-destructive">
            <Trash2 />
          </Button>
        </div>
      )
    },
  },
]
