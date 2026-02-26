import { User } from '@/lib/types/user'
import { StateCreator } from 'zustand'

interface AuthSlice {
  user: User | null
  setUser: (user: User) => void
  unsetUser: () => void
}

const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  unsetUser: () => set({ user: null }),
})

export default createAuthSlice
export type { AuthSlice }
