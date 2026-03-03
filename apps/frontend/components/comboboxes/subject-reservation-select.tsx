'use client'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import { eligibleSubjectsQueryOptions } from '@/lib/query-options/eligible-subjects-query-options'
import { useQuery } from '@tanstack/react-query'
import { BasicSelectItem } from '../basic-select'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Data } from '@api-starter-kit/backend/data'

export default function SubjectReservationSelect({
  studentId,
  values,
  setValues,
}: {
  studentId: string
  setValues: Dispatch<SetStateAction<string[]>>
  values: string[]
}) {
  const { data } = useQuery(eligibleSubjectsQueryOptions(studentId))

  const selectOptions: BasicSelectItem[] = useMemo(() => {
    if (!data) return []

    return data
      .filter((item) => !values.includes(item.id))
      .map((item) => ({ value: item.id, label: item.title ?? '' }))
  }, [data, values])

  const optionsMap: Record<string, Data.Subject> = useMemo(() => {
    const map: Record<string, Data.Subject> = {}
    if (!data) return map

    data.forEach((item) => (map[item.id] = item))

    return map
  }, [data])

  const defaultValue: BasicSelectItem = { label: '', value: '' }
  const onItemRemoveClick = (val: string) => {
    setValues((prev) => prev.filter((item) => item !== val))
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <Combobox
        onValueChange={(value) => {
          if (!value) return
          setValues((prev) => [...prev, value.value])
        }}
        value={defaultValue}
        items={selectOptions}
        itemToStringValue={(item) => item.value}
      >
        <ComboboxInput className="w-full" placeholder="Select a subject" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => {
              const info = optionsMap[item.value]
              return (
                <ComboboxItem key={item.value} value={item}>
                  <SubjectInfoItem subject={info} />
                </ComboboxItem>
              )
            }}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <Separator />
      <div className="flex flex-col gap-1 h-64 border rounded-lg p-2">
        {values.length > 0 ? (
          values.map((val) => (
            <div
              key={val}
              className="flex items-center gap-1 py-1 px-2 border rounded bg-secondary relative"
            >
              <div className="flex-1">{optionsMap[val].title}</div>
              <div className="absolute right-2">
                <Button
                  title="Remove Subject"
                  onClick={() => onItemRemoveClick(val)}
                  variant="ghost"
                  size="icon-sm"
                >
                  <X />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-40 text-sm text-muted-foreground m-auto text-center">
            Choose a subject using the input above.
          </div>
        )}
      </div>
    </div>
  )
}

function SubjectInfoItem({ subject }: { subject: Data.Subject }) {
  const prereqsString = subject.prerequisites?.map((item) => item.title).join(', ') ?? 'None'
  return (
    <div className="space-y-0.5">
      <div>{subject.title}</div>
      <div className="text-xs text-muted-foreground">
        {' '}
        <strong>Prerequsites: </strong>
        {prereqsString}
      </div>
    </div>
  )
}
