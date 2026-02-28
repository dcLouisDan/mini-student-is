'use client'

import { Spinner } from '@/components/ui/spinner'
import useAuth from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      console.log('UNAUTHORIZED')
      router.replace('/auth/login')
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return <LoadingState />
  }

  return <>{children}</>
}

export function UnAuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      console.log('AUTHENTICATED')
      router.replace('/dashboard')
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return <LoadingState />
  }

  return <>{children}</>
}

export function LoadingState() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner />
    </div>
  )
}
