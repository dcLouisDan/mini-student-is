import AuthGuard from '@/app/auth-guard'
import AppHeader from '@/components/app-header'
import { BreadcrumbItemType } from '@/lib/types/ui'
import { Suspense } from 'react'
import GradesTable from './table/grades-table'
import EncodeGradesDialog from '@/components/dialogs/encode-grades-dialog'

const PAGE_BREADCRUMBS: BreadcrumbItemType[] = [
  {
    title: 'Grades',
    href: '/grades',
  },
]

export default function GradesPage() {
  return (
    <>
      <AppHeader breadcrumbs={PAGE_BREADCRUMBS} />
      <AuthGuard>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center gap-2 justify-between">
            <h4>Manage Grade Records</h4>
            <EncodeGradesDialog />
          </div>
          <Suspense>
            <GradesTable />
          </Suspense>
        </main>
      </AuthGuard>
    </>
  )
}
