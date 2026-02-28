import AppHeader from '@/components/app-header'
import AuthGuard from '../../auth-guard'
import { BreadcrumbItemType } from '@/lib/types/ui'

const PAGE_BREADCRUMBS: BreadcrumbItemType[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
]

export default function Page() {
  return (
    <>
      <AppHeader breadcrumbs={PAGE_BREADCRUMBS} />
      <AuthGuard>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
        </main>
      </AuthGuard>
    </>
  )
}
