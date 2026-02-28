import { BreadcrumbItemType } from '@/lib/types/ui'
import { StateCreator } from 'zustand'

interface UiSlice {
  breadcrumbs: BreadcrumbItemType[]
  setBreadcrumbs: (items: BreadcrumbItemType[]) => void
}

const createUiSlice: StateCreator<UiSlice, [], [], UiSlice> = (set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (items) => set({ breadcrumbs: items }),
})

export default createUiSlice
export type { UiSlice }
