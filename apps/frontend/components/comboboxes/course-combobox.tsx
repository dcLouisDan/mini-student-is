'use client'

import { coursesQueryOptions } from '@/lib/query-options/courses-query-options'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { QueryCombobox } from '../query-combo-box'
import { BasicSelectItem } from '../basic-select'

export default function CourseCombobox({
  value,
  onValueChange,
}: {
  value: string
  onValueChange: (value: string) => void
}) {
  const [idSearch, setIdSearch] = useState(value)
  const [search, setSearch] = useState('')
  const { data, isLoading } = useQuery(coursesQueryOptions({ page: 1, perPage: 20, name: search }))

  const selectOptions: BasicSelectItem[] = useMemo(() => {
    if (!data) return []

    return data.data.map((item) => ({ value: item.id, label: item.name ?? '' }))
  }, [data])

  const selectItem: BasicSelectItem | null = useMemo(() => {
    if (value == '') return null
    return selectOptions.find((item) => item.value == value) ?? null
  }, [data, value])

  console.log(value)
  return (
    <QueryCombobox
      key={'course-combo'}
      onValueChange={(item) => {
        if (item) onValueChange(item?.value)
      }}
      onInputValueChange={(inputValue) => {
        if (inputValue !== '') {
          setIdSearch('')
        } else {
          setIdSearch(value)
        }
        setSearch(inputValue)
      }}
      options={selectOptions}
      value={selectItem}
      isLoading={isLoading}
      placeholder="Select Course..."
    />
  )
}
