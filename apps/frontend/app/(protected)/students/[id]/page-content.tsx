'use client'

import { ConfirmationDialog } from '@/components/confirmation-dialog'
import SubjectReservationDialog from '@/components/dialogs/subject-reservation-dialog'
import { handleRequestError } from '@/components/handle-request-error'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { client } from '@/lib/api'
import { QUERY_KEYS } from '@/lib/query-options/query-keys'
import { studentQueryOptions } from '@/lib/query-options/student-query-options'
import { dateToFormatedString } from '@/lib/utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import StudentGradesTable from './table/student-grades-table'

export default function StudentPageContent({ id }: { id: string }) {
  const { data: student } = useQuery(studentQueryOptions(id))
  const queryClient = useQueryClient()

  const reservedSubjects = student?.reservedSubjects ?? []

  const onCancelClick = async (subjectId: string) => {
    try {
      const res = await client.api.subjectReservations.destroy({
        params: { id: id, subjectId },
      })

      if (res) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.STUDENTS, id],
        })

        toast.success('Subjects reservation deleted')
      }
    } catch (e) {
      handleRequestError(e)
    }
  }

  return (
    <main className="flex flex-col sm:flex-row flex-1 gap-4 p-4 pt-0">
      <aside className="w-full sm:max-w-sm flex flex-col gap-4">
        <Card size="sm">
          <CardHeader>
            <CardTitle>
              {student?.lastName}, {student?.firstName}
            </CardTitle>
            <CardDescription className="flex flex-col gap-1">
              <p className="text-xs">{student?.course?.name}</p>
              <Separator />
              <div className="grid grid-cols-2 items-center gap-2 text-xs">
                <div>Email: </div>
                <div className="font-bold">{student?.email}</div>
                <div>Birth Date: </div>
                <div className="font-bold">{dateToFormatedString(student?.birthDate ?? '')}</div>
              </div>
            </CardDescription>
          </CardHeader>
          <Separator />
          <div className="px-4 space-y-2">
            <Label>Reserved Subjects:</Label>
            <div className="grid gap-2">
              {reservedSubjects.length === 0 ? (
                <div className="w-full text-center p-2 text-muted-foreground">
                  No reserved subjects
                </div>
              ) : (
                reservedSubjects.map((subject) => (
                  <div key={subject.id} className="flex items-center gap-2">
                    <Link
                      href={`/subjects/${subject.id}`}
                      className="flex-1 border rounded py-1 px-2 bg-secondary text-secondary-foreground"
                    >
                      {subject.title}
                    </Link>
                    <ConfirmationDialog
                      title={`Cancel subject reservation?`}
                      description="If you continue, the subject reservation will be cancelled and will no longer apply to this student."
                      triggerComponent={
                        <Button
                          title="Delete"
                          size="icon-sm"
                          variant="ghost"
                          className="text-destructive"
                        >
                          <X />
                        </Button>
                      }
                      submitButtonContent="Continue"
                      submitButtonVariant={{ variant: 'destructive' }}
                      onSubmit={async () => await onCancelClick(subject.id)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
          <CardContent className="space-y-2"></CardContent>
          <CardFooter className="flex gap-2 items-center">
            <SubjectReservationDialog studentId={id} />
          </CardFooter>
        </Card>
      </aside>
      <div className="flex-1">
        <StudentGradesTable studentId={id} />
      </div>
    </main>
  )
}
