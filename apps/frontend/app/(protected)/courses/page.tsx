import AuthGuard from '@/app/auth-guard'
import AppHeader from '@/components/app-header'
import { BreadcrumbItemType } from '@/lib/types/ui'
import React, { Suspense } from 'react'
import CoursesTable from './table/courses-table'
import NewCourseFormDialog from '@/components/dialogs/new-course-form-dialog'

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
          <div className="flex items-center gap-2 justify-between">
            <h4>Manage Courses</h4>
            <div>
              <NewCourseFormDialog />
            </div>
          </div>
          <Suspense>
            <CoursesTable />
          </Suspense>
        </main>
      </AuthGuard>
    </>
  )
}
