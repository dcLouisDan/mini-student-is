import AuthGuard from '@/app/auth-guard'
import AppHeader from '@/components/app-header'
import { BreadcrumbItemType } from '@/lib/types/ui'
import { Suspense } from 'react'
import UsersTable from './table/users-table'
import NewUserFormDialog from '@/components/dialogs/new-user-form-dialog'

const PAGE_BREADCRUMBS: BreadcrumbItemType[] = [
  {
    title: 'Users',
    href: '/users',
  },
]

export default function UsersPage() {
  return (
    <>
      <AppHeader breadcrumbs={PAGE_BREADCRUMBS} />
      <AuthGuard>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center gap-2 justify-between">
            <h4>Manage Users</h4>
            <div>
              <NewUserFormDialog />
            </div>
          </div>
          <Suspense>
            <UsersTable />
          </Suspense>
        </main>
      </AuthGuard>
    </>
  )
}
