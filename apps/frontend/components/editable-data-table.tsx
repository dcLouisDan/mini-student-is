'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  RowData,
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
import { useState } from 'react'
import { DefaultValues, FieldValues, FormProvider, useForm } from 'react-hook-form'

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    editingRowId: string | null
    setEditingRowId: (value: string | null) => void
    onRowSubmit: (data: TData) => Promise<boolean>
  }
}

interface DataTableProps<TData extends FieldValues, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowSubmit: (data: TData) => Promise<boolean>
}

export function EditableDataTable<TData extends FieldValues, TValue>({
  columns,
  data,
  onRowSubmit,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [editingRowId, setEditingRowId] = useState<string | null>(null)
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
              .rows.map((row) => <EditingRow editingRowId={editingRowId} row={row} key={row.id} />)
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
