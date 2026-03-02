import AuthGuard from '@/app/auth-guard'
import AppHeader from '@/components/app-header'
import { BreadcrumbItemType } from '@/lib/types/ui'
import SubjectPageContent from './page-content'

const PAGE_BREADCRUMBS: BreadcrumbItemType[] = [
  {
    title: 'Subjects',
    href: '/subjects',
  },
  {
    title: 'Subject Info',
    href: '/subjects',
  },
]

export default async function SubjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <>
      <AppHeader breadcrumbs={PAGE_BREADCRUMBS} />
      <AuthGuard>
        <SubjectPageContent id={id} />
      </AuthGuard>
    </>
  )
}
