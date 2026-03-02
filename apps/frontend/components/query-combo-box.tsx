'use client'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/ui/combobox'
import { BasicSelectItem } from './basic-select'
import { Button } from './ui/button'

export function QueryCombobox({
  options,
  placeholder = 'Select an option',
  onInputValueChange,
  onValueChange,
  isLoading = false,
  value,
}: {
  value: BasicSelectItem | null
  options: BasicSelectItem[]
  placeholder?: string
  onInputValueChange: (value: string) => void
  onValueChange: (value: BasicSelectItem | null) => void
  isLoading?: boolean
}) {
  return (
    <>
      <Combobox
        value={value}
        onInputValueChange={onInputValueChange}
        onValueChange={onValueChange}
        items={options}
        itemToStringValue={(option) => option.label}
        isItemEqualToValue={(itemValue, value) => itemValue.value == value.value}
      >
        <ComboboxTrigger
          render={
            <Button variant="outline" className="w-full justify-between font-normal">
              <ComboboxValue />
            </Button>
          }
        />
        <ComboboxContent>
          <ComboboxInput showTrigger={false} placeholder="Search" />
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  )
}
