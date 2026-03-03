'use client'

import useAuth from '@/hooks/use-auth'
import Link from 'next/link'

export default function HomeAuthButtons() {
  const { isAuthenticated } = useAuth()
  return (
    <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
      <Link
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5"
        href={isAuthenticated ? '/dashboard' : '/auth/login'}
      >
        {isAuthenticated ? 'Dashboard' : 'Login'}
      </Link>
    </div>
  )
}
