import { createTuyau } from '@tuyau/core/client'
import { registry } from '@api-starter-kit/backend/registry'

export const client = createTuyau({
  baseUrl: process.env.VITE_API_URL || 'http://localhost:3333',
  registry,
  headers: { Accept: 'application/json' },
  credentials: 'include',
})
