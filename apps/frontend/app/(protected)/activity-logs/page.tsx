import AuthGuard from '@/app/auth-guard'
import AppHeader from '@/components/app-header'
import { BreadcrumbItemType } from '@/lib/types/ui'
import { Suspense } from 'react'
import ActivityLogsTable from './table/activity-logs-table'

const PAGE_BREADCRUMBS: BreadcrumbItemType[] = [
  {
    title: 'Activity Logs',
    href: '/activity-logs',
  },
]

export default function ActivityLogsPage() {
  return (
    <>
      <AppHeader breadcrumbs={PAGE_BREADCRUMBS} />
      <AuthGuard>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center gap-2 justify-between">
            <h4>View Activity Logs</h4>
          </div>
          <Suspense>
            <ActivityLogsTable />
          </Suspense>
        </main>
      </AuthGuard>
    </>
  )
}
