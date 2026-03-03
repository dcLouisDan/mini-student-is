import AuthGuard from '@/app/auth-guard'
import AppHeader from '@/components/app-header'
import { BreadcrumbItemType } from '@/lib/types/ui'
import StudentPageContent from './page-content'

const PAGE_BREADCRUMBS: BreadcrumbItemType[] = [
  {
    title: 'Students',
    href: '/students',
  },
  {
    title: 'Student Info',
    href: '/students',
  },
]

export default async function StudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <>
      <AppHeader breadcrumbs={PAGE_BREADCRUMBS} />
      <AuthGuard>
        <StudentPageContent id={id} />
      </AuthGuard>
    </>
  )
}
