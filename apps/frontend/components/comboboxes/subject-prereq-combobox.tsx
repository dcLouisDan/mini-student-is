'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { QueryCombobox } from '../query-combo-box'
import { BasicSelectItem } from '../basic-select'
import { subjectPrereqOptionsQueryOptions } from '@/lib/query-options/subject-prereq-options-query-options'

export default function SubjectPrereqCombobox({
  value,
  onValueChange,
  subjectId,
}: {
  subjectId: string
  value: string
  onValueChange: (value: string) => void
}) {
  const { data, isLoading } = useQuery(subjectPrereqOptionsQueryOptions(subjectId))

  const selectOptions: BasicSelectItem[] = useMemo(() => {
    console.log(data)
    if (!data) return []

    return data.map((item) => ({ value: item.id, label: item.title ?? '' }))
  }, [data])

  const selectItem: BasicSelectItem | null = useMemo(() => {
    if (value == '') return null
    return selectOptions.find((item) => item.value == value) ?? null
  }, [data, value])

  return (
    <QueryCombobox
      key={'prereq-combo'}
      onValueChange={(item) => {
        if (item) onValueChange(item?.value)
      }}
      options={selectOptions}
      value={selectItem}
      isLoading={isLoading}
      placeholder="Select subject prerequisite..."
    />
  )
}
