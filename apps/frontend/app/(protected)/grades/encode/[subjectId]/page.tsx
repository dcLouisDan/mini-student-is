import AuthGuard from '@/app/auth-guard'
import AppHeader from '@/components/app-header'
import { BreadcrumbItemType } from '@/lib/types/ui'
import GradePageContent from './page-content'

const PAGE_BREADCRUMBS: BreadcrumbItemType[] = [
  {
    title: 'Grades',
    href: '/grades',
  },
  {
    title: 'Edit Grade Sheet',
    href: '/grades',
  },
]

export default async function GradePage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params
  return (
    <>
      <AppHeader breadcrumbs={PAGE_BREADCRUMBS} />
      <AuthGuard>
        <GradePageContent id={subjectId} />
      </AuthGuard>
    </>
  )
}
