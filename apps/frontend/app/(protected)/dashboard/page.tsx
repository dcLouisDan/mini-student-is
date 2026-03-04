import AppHeader from '@/components/app-header'
import AuthGuard from '../../auth-guard'
import { BreadcrumbItemType } from '@/lib/types/ui'
import PageContent from './page-content'

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
        <PageContent />
      </AuthGuard>
    </>
  )
}
