'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function DatePicker({
  value,
  onValueChange,
}: {
  value?: Date
  onValueChange?: (date: Date | undefined) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" id="date" className="justify-start font-normal">
          {date ? date.toLocaleDateString() : 'Select date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={value ?? date}
          defaultMonth={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            setDate(date)
            if (onValueChange) {
              onValueChange(date)
            }
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
