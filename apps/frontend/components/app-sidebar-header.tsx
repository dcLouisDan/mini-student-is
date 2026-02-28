import useAuth from '@/hooks/use-auth'
import { BookOpenText } from 'lucide-react'
import Link from 'next/link'

export default function AppSidebarHeader() {
  const { user } = useAuth()
  return (
    <Link
      href="/dashboard"
      className="w-full border p-2 rounded-md flex gap-2 items-center hover:bg-muted transition-all duration-150 ease-in-out"
    >
      <div className="size-8 rounded bg-primary text-primary-foreground flex items-center justify-center">
        <BookOpenText />
      </div>
      <div className="flex-1 flex flex-col">
        <h4 className="font-semibold text-sm">STUDENT INFO SYSTEM</h4>
        <p className="text-[0.65em]">{user?.role.toUpperCase()}</p>
      </div>
    </Link>
  )
}
