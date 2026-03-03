'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { Data } from '@api-starter-kit/backend/data'
import { Button } from '@/components/ui/button'
import { Edit, PencilOff, Trash2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
import { ConfirmationDialog } from '@/components/confirmation-dialog'
import useUsers, { UserFormInputs } from '@/hooks/use-users'
import useAuth from '@/hooks/use-auth'
import UpdateUserFormDialog from '@/components/dialogs/update-user-form-dialog'

export const columns: ColumnDef<Data.User>[] = [
  {
    id: 'select',
    cell: ({ row }) => {
      const { user } = useAuth()
      return (
        <Checkbox
          disabled={row.original.id === user?.id}
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => {
      const { user } = useAuth()
      const item = row.original
      const { deleteUser } = useUsers()
      const onUserDelete = async () => {
        const success = await deleteUser(item.id)

        if (success) {
          toast.success(`User deleted.`)
        }
      }
      return (
        <div className="flex items-center gap-1">
          <UpdateUserFormDialog user={item} />

          {item.id !== user?.id && (
            <ConfirmationDialog
              title={`Delete user?`}
              description="Are you sure you want to proceed? Note: This action cannot be undone."
              triggerComponent={
                <Button title="Delete" size="icon-sm" variant="ghost" className="text-destructive">
                  <Trash2 />
                </Button>
              }
              submitButtonContent="Delete"
              submitButtonVariant={{ variant: 'destructive' }}
              onSubmit={onUserDelete}
            />
          )}
        </div>
      )
    },
  },
]
