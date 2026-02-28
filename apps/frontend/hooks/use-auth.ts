'use client'

import { client } from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const AUTH_QUERY_KEY = 'auth'

export default function useAuth() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: [AUTH_QUERY_KEY],
    queryFn: async () => {
      const { data } = await client.api.auth.profile.show({})

      return data
    },
    retry: false,
    staleTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const logout = async () => {
    const { success } = await client.api.auth.session.destroy({})

    if (success) {
      queryClient.setQueryData([AUTH_QUERY_KEY], null)
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] })
      router.push('/auth/login')
    }
  }

  return { user, isAuthenticated: !!user, isLoading, error, logout }
}
