import AuthGuard from '@/app/auth-guard'
import AppHeader from '@/components/app-header'
import { BreadcrumbItemType } from '@/lib/types/ui'
import { Suspense } from 'react'
import StudentsTable from './table/students-table'
import NewStudentFormDialog from '@/components/dialogs/new-student-form-dialog'
import StudentCsvUploadDialog from '@/components/dialogs/students-csv-upload-dialog'

const PAGE_BREADCRUMBS: BreadcrumbItemType[] = [
  {
    title: 'Students',
    href: '/students',
  },
]

export default function StudentsPage() {
  return (
    <>
      <AppHeader breadcrumbs={PAGE_BREADCRUMBS} />
      <AuthGuard>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center gap-2 justify-between">
            <h4>Manage Students</h4>
            <div className="flex gap-2 flex-col sm:flex-row items-center">
              <StudentCsvUploadDialog />
              <NewStudentFormDialog />
            </div>
          </div>
          <Suspense>
            <StudentsTable />
          </Suspense>
        </main>
      </AuthGuard>
    </>
  )
}
