'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  Row,
  RowData,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { DefaultValues, FieldValues, FormProvider, useForm } from 'react-hook-form'
import TableSelectionBar from './table-selection-bar'
import { ConfirmationDialog } from './confirmation-dialog'
import { Button } from './ui/button'

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    editingRowId?: string | null
    setEditingRowId?: (value: string | null) => void
    onRowSubmit?: (data: TData) => Promise<boolean>
  }
}

interface DataTableProps<TData extends FieldValues, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowSubmit: (data: TData) => Promise<boolean>
  onBatchDelete?: (rows: Row<TData>[]) => void
}

export function EditableDataTable<TData extends FieldValues, TValue>({
  columns,
  data,
  onRowSubmit,
  onBatchDelete,
}: DataTableProps<TData, TValue>) {
  const [editingRowId, setEditingRowId] = useState<string | null>(null)
  const [rowSelection, setRowSelection] = useState({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    meta: {
      editingRowId,
      setEditingRowId,
      onRowSubmit,
    },
  })

  return (
    <>
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <TableSelectionBar
          total={table.getRowModel().rows.length}
          selectedTotal={table.getSelectedRowModel().rows.length}
          action={
            <ConfirmationDialog
              title={`Delete ${table.getFilteredSelectedRowModel().rows.length} courses?`}
              description="All related records (subjects, students, grades) will also be deleted. Are you sure you want to proceed? Note: This action cannot be undone."
              triggerComponent={<Button variant={'destructive'}>Delete Selected</Button>}
              submitButtonContent="Delete"
              submitButtonVariant={{ variant: 'destructive' }}
              onSubmit={() => {
                onBatchDelete?.(table.getSelectedRowModel().rows)
              }}
            />
          }
        />
      )}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.map((row) => (
                  <EditingRow editingRowId={editingRowId} row={row} key={row.id} />
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

function EditingRow<TData extends FieldValues>({
  row,
  editingRowId,
}: {
  row: Row<TData>
  editingRowId: string | null
}) {
  const form = useForm<TData>({
    defaultValues: row.original as DefaultValues<TData>,
  })

  const isEditing = row.original.id === editingRowId
  const otherEditInProgress = !!editingRowId && !isEditing
  return (
    <FormProvider {...form}>
      <TableRow
        className={otherEditInProgress ? 'opacity-50 pointer-events-none' : ''}
        key={row.id}
        data-state={row.getIsSelected() && 'selected'}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} className="whitespace-normal">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    </FormProvider>
  )
}
