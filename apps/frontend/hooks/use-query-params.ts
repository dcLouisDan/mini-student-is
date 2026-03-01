'use client'

import { BaseParams } from '@/lib/types/ui'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function useQueryParams<T extends BaseParams>() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (updates: Partial<Record<keyof T, string | null>>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })

      return params.toString()
    },
    [searchParams]
  )

  const updateParams = useCallback(
    (updates: Partial<Record<keyof T, string | null>>, options?: { replace?: boolean }) => {
      const queryString = createQueryString(updates)
      const method = options?.replace ? router.replace : router.push

      method(`${pathname}?${queryString}`)
    },
    [createQueryString, router, pathname]
  )

  const getParam = useCallback(
    function <K>(key: keyof T, defaultReturn: K = undefined as K): K | undefined {
      const value = searchParams.get(key as string)
      if (!value) return defaultReturn

      if (typeof defaultReturn == 'number') {
        return Number(value) as K
      }

      return value as K
    },
    [searchParams]
  )

  return { updateParams, getParam }
}
