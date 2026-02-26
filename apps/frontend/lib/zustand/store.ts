import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import createSelectors from './create-selectors'
import createAuthSlice, { AuthSlice } from './slices/auth-slice'

type StoreType = AuthSlice

const useStoreBase = create<StoreType>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: 'mini-sis-storage', // unique name
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

const useStore = createSelectors(useStoreBase)
export default useStore
