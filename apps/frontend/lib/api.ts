import { createTuyau } from '@tuyau/core/client'
import { registry } from '@api-starter-kit/backend/registry'

export const client = createTuyau({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://msis-api.danlouis.dev',
  registry,
  headers: { Accept: 'application/json' },
  credentials: 'include',
  retry: 1,
})
