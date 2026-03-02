import AuthGuard from '@/app/auth-guard'
import AppHeader from '@/components/app-header'
import { BreadcrumbItemType } from '@/lib/types/ui'
import { Suspense } from 'react'
import SubjectsTable from './table/subjects-table'
import NewSubjectFormDialog from '@/components/dialogs/new-subject-form-dialog'

const PAGE_BREADCRUMBS: BreadcrumbItemType[] = [
  {
    title: 'Subjects',
    href: '/subjects',
  },
]

export default function SubjectsPage() {
  return (
    <>
      <AppHeader breadcrumbs={PAGE_BREADCRUMBS} />
      <AuthGuard>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center gap-2 justify-between">
            <h4>Manage Subjects</h4>
            <div>
              <NewSubjectFormDialog />
            </div>
          </div>
          <Suspense>
            <SubjectsTable />
          </Suspense>
        </main>
      </AuthGuard>
    </>
  )
}
