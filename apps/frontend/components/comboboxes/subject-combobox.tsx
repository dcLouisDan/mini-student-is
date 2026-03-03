'use client'

import { subjectsQueryOptions } from '@/lib/query-options/subjects-query-options'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { QueryCombobox } from '../query-combo-box'
import { BasicSelectItem } from '../basic-select'

export default function SubjectCombobox({
  value,
  onValueChange,
}: {
  value: string
  onValueChange: (value: string) => void
}) {
  const [idSearch, setIdSearch] = useState(value)
  const [search, setSearch] = useState('')
  const { data, isLoading } = useQuery(
    subjectsQueryOptions({ page: 1, perPage: 20, title: search, id: idSearch })
  )

  const selectOptions: BasicSelectItem[] = useMemo(() => {
    if (!data) return []

    return data.data.map((item) => ({ value: item.id, label: item.title ?? '' }))
  }, [data])

  const selectItem: BasicSelectItem | null = useMemo(() => {
    if (value == '') return null
    return selectOptions.find((item) => item.value == value) ?? null
  }, [data, value])

  console.log(value)
  return (
    <QueryCombobox
      key={'subject-combo'}
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
      placeholder="Select Subject..."
    />
  )
}
