'use client'

import { UpdateUserForm } from '@/components/user-update-form'
import useAuth from '@/hooks/use-auth'
import { toast } from 'sonner'

export default function MePageContent() {
  const { user } = useAuth()

  if (!user) return null
  return <UpdateUserForm onSubmitSuccess={() => toast.success('Profile updated')} user={user} />
}
