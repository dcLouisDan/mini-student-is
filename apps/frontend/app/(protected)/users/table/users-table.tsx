'use client'

import { columns } from './columns'
import useUsers, { UserFormInputs } from '@/hooks/use-users'
import { PaginationBar } from '@/components/pagination-bar'
import SortPopover from '@/components/sort-popover'
import DebouncedInput from '@/components/debounced-input'
import useQueryParams from '@/hooks/use-query-params'
import { UsersParams } from '@/lib/query-options/users-query-options'
import { Field, FieldLabel } from '@/components/ui/field'
import { EditableDataTable } from '@/components/editable-data-table'
import { toast } from 'sonner'

export default function UsersTable() {
  const {
    users,
    pagination: { total, currentPage, perPage },
    sortByOptions,
    sortBy,
    sortOrder,
    role,
    name,
    updateUser,
    batchDeleteUser,
  } = useUsers()

  const { updateParams } = useQueryParams<UsersParams>()

  const onUserBatchDelete = async (selectedRows: string[]) => {
    const success = await batchDeleteUser(selectedRows)

    if (success) {
      toast.success(`${selectedRows.length} rows have been deleted.`)
    }
  }
  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-2 justify-end  border rounded-lg p-2 bg-secondary">
        <Field orientation="horizontal">
          <FieldLabel>User Role</FieldLabel>
          <DebouncedInput
            value={role ?? ''}
            onChange={(value) => {
              updateParams({ role: value as string })
            }}
            placeholder="Search by user role..."
          />
        </Field>
        <Field orientation="horizontal">
          <FieldLabel>User Name</FieldLabel>
          <DebouncedInput
            value={name ?? ''}
            onChange={(value) => {
              updateParams({ name: value as string })
            }}
            placeholder="Search by user name..."
          />
        </Field>
        <div className="flex items-center gap-2">
          <PaginationBar total={total} page={currentPage} size={perPage} />
          <SortPopover
            sortableOptions={sortByOptions}
            sortValue={sortBy}
            directionValue={sortOrder}
          />
        </div>
      </div>
      <EditableDataTable
        data={users}
        columns={columns}
        onBatchDelete={async (rows) => {
          const selected = rows.map((row) => row.original.id)

          await onUserBatchDelete(selected)
        }}
      />
    </>
  )
}
