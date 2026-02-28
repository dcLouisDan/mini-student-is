import AuthGuard from '@/app/auth-guard'
import AppHeader from '@/components/app-header'
import { BreadcrumbItemType } from '@/lib/types/ui'
import React from 'react'

const PAGE_BREADCRUMBS: BreadcrumbItemType[] = [
  {
    title: 'Courses',
    href: '/courses',
  },
]

export default function CoursesPage() {
  return (
    <>
      <AppHeader breadcrumbs={PAGE_BREADCRUMBS} />
      <AuthGuard>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div>CoursesPage</div>
        </main>
      </AuthGuard>
    </>
  )
}
