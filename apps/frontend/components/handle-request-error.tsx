import { TuyauHTTPError } from '@tuyau/core/client'
import { toast } from 'sonner'

export const handleRequestError = (e: unknown) => {
  if (e instanceof TuyauHTTPError) {
    const { response } = e

    // 1. Check for Adonis Validation errors (array of errors)
    if (Array.isArray(response?.errors)) {
      const firstMessage = response.errors[0]?.message || 'Validation failed'
      toast.error(firstMessage)
      return
    }

    // 2. Check for a single message (common in custom exceptions)
    if (response?.message) {
      toast.error(response.message)
      return
    }

    // 3. Fallback for specific status codes if no body is found
    if (e.status === 401) return toast.error('Session expired. Please login.')
    if (e.status === 403) return toast.error('You do not have permission.')

    toast.error(`Error: ${e.status || 'Server Error'}`)
  } else {
    // Handle network errors, CORS issues, or JS crashes
    const error = e as Error
    toast.error(error.message || 'An unexpected error occurred')
  }
}
