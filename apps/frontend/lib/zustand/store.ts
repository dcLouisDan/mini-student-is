import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import createSelectors from './create-selectors'
import createUiSlice, { UiSlice } from './slices/ui-slice'

type StoreType = UiSlice

const useStoreBase = create<StoreType>()(
  persist(
    (...a) => ({
      ...createUiSlice(...a),
    }),
    {
      name: 'mini-sis-storage', // unique name
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

const useAppStore = createSelectors(useStoreBase)
export default useAppStore
