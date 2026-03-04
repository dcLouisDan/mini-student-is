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
import useCourses from '@/hooks/use-courses'
import dayjs from '@/lib/dayjs'

export const columns: ColumnDef<Data.ActivityLog>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    id: 'user',
    header: 'User Name',
    accessorFn: (row) => row.user?.fullName ?? 'System',
  },
  {
    accessorKey: 'entityType',
    header: 'Entity Type',
  },
  {
    accessorKey: 'entityId',
    header: 'Entity ID',
  },
  {
    accessorKey: 'event',
    header: 'Event',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'createdAt',
    header: 'Logged At',
    accessorFn: (row) => dayjs(row.createdAt).fromNow(),
  },
]
