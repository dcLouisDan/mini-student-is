import HomeAuthButtons from '@/components/home-auth-buttons'
import { BookOpenText } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="size-20 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
          <BookOpenText className="size-12" />
        </div>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Mini School Information System
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Offering a clear, straightforward example of digital school management in action.
          </p>
        </div>
        <HomeAuthButtons />
      </main>
    </div>
  )
}
