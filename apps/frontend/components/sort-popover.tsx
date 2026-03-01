'use client'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowUpDown } from 'lucide-react'
import { Label } from './ui/label'
import BasicRadioGroup from './basic-radio-group'
import { BasicSelectItem } from './basic-select'
import { SortDirection } from '@tanstack/react-table'
import useQueryParams from '@/hooks/use-query-params'
import { BaseParams } from '@/lib/types/ui'

interface SortPopoverProps {
  sortableOptions?: BasicSelectItem[]
  sortValue?: string
  onSortValueChange?: (value: string | undefined) => void
  directionValue?: SortDirection
  onDirectionValueChange?: (value: string | undefined) => void
  onSubmit?: (sort?: string, direction?: SortDirection) => void
  onClear?: () => void
}

export const SortDirectionSelectItems: BasicSelectItem[] = [
  {
    value: 'asc',
    label: 'Ascending',
  },
  {
    value: 'desc',
    label: 'Descending',
  },
]

export default function SortPopover({
  sortValue,
  onSortValueChange,
  directionValue,
  onDirectionValueChange,
  sortableOptions = [],
  onSubmit,
  onClear,
}: SortPopoverProps) {
  const { updateParams } = useQueryParams<BaseParams>()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <ArrowUpDown />
          Sort
        </Button>
      </PopoverTrigger>
      <PopoverContent className="text-sm p-0" align="end">
        <div className="flex gap-2 items-center p-2">
          <ArrowUpDown className="size-4" />
          <p className="font-bold">Sort</p>
        </div>
        <Separator />
        <div className="flex flex-col gap-4 p-3">
          <div className="grid gap-3">
            <Label className="text-muted-foreground">Sort by:</Label>
            <BasicRadioGroup
              value={sortValue}
              onValueChange={(value) => {
                if (onSortValueChange) {
                  onSortValueChange(value)
                } else {
                  updateParams({ sortBy: value })
                }
              }}
              className="flex flex-wrap"
              items={sortableOptions}
            />
          </div>
          <div className="grid gap-3">
            <Label className="text-muted-foreground">Order:</Label>
            <BasicRadioGroup
              value={directionValue}
              onValueChange={(value) => {
                if (onDirectionValueChange) {
                  onDirectionValueChange(value)
                } else {
                  updateParams({ sortOrder: value })
                }
              }}
              className="flex flex-wrap gap-2"
              items={SortDirectionSelectItems}
            />
          </div>
        </div>
        <Separator />
        <div className="flex gap-2 text-xs items-center justify-between p-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              if (onClear) {
                onClear()
              } else {
                updateParams({ sortBy: 'createdAt', sortOrder: 'asc' })
              }
            }}
          >
            Reset
          </Button>
          {onSubmit && (
            <Button size="sm" variant="default" onClick={() => onSubmit(sortValue, directionValue)}>
              Apply
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
