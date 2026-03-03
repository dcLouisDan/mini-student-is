import AuthGuard from '@/app/auth-guard'
import AppHeader from '@/components/app-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BreadcrumbItemType } from '@/lib/types/ui'
import MePageContent from './page-content'

const PAGE_BREADCRUMBS: BreadcrumbItemType[] = [
  {
    title: 'Account',
    href: '/auth/me',
  },
]

export default function ProfilePage() {
  return (
    <>
      <AppHeader breadcrumbs={PAGE_BREADCRUMBS} />
      <AuthGuard>
        <main className="flex flex-1 justify-center py-12">
          <Card className="mb-auto">
            <CardHeader>
              <CardTitle>Account Profile</CardTitle>
              <CardDescription>
                Manage your profile information here. Review and edit your details as needed.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-w-lg">
              <MePageContent />
            </CardContent>
          </Card>
        </main>
      </AuthGuard>
    </>
  )
}
