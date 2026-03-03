import { BookOpenText, GalleryVerticalEnd } from 'lucide-react'

import { LoginForm } from '@/components/login-form'
import { UnAuthGuard } from '@/app/auth-guard'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href="/"
            className="size-16 bg-primary rounded-xl flex items-center justify-center text-primary-foreground"
          >
            <BookOpenText className="size-8" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block"></div>
    </div>
  )
}
