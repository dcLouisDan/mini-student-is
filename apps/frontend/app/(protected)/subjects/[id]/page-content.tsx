'use client'

import { ConfirmationDialog } from '@/components/confirmation-dialog'
import NewSubjectPrereqDialog from '@/components/dialogs/new-subject-prereq-dialog'
import { handleRequestError } from '@/components/handle-request-error'
import { Button, buttonVariants } from '@/components/ui/button'
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
import { subjectQueryOptions } from '@/lib/query-options/subject-query-options'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import SubjectStudentsTable from './table/subject-students-table'

export default function SubjectPageContent({ id }: { id: string }) {
  const { data: subject } = useQuery(subjectQueryOptions(id))
  const prerequisites = subject?.prerequisites ?? []
  const queryClient = useQueryClient()

  const onDetachClick = async (prereqId: string) => {
    try {
      const res = await client.api.subjectPrerequisites.destroy({
        params: { id, prerequisiteSubjectId: prereqId },
      })

      if (res) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.SUBJECTS, id],
        })

        toast.success('Prerequisite removed')
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
            <CardTitle>{subject?.code}</CardTitle>
            <CardDescription className="flex flex-col gap-1">
              <p>{subject?.title}</p>
              <p className="text-xs">{subject?.course?.name}</p>
              <Separator />
              <div className="grid grid-cols-2 items-center gap-2">
                <div>Units: </div>
                <div className="font-bold">{subject?.units}</div>
                <div>Passing Grade: </div>
                <div className="font-bold">{subject?.passingGrade}</div>
              </div>
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-2">
            <Label>Preqrequisites:</Label>
            <div className="grid gap-2">
              {prerequisites.length === 0 ? (
                <div className="w-full text-center p-2 text-muted-foreground">No prerequisites</div>
              ) : (
                prerequisites.map((prereq) => (
                  <div key={prereq.id} className="flex items-center gap-2">
                    <Link
                      href={`/subjects/${prereq.id}`}
                      className="flex-1 border rounded py-1 px-2 bg-secondary text-secondary-foreground"
                    >
                      {prereq.title}
                    </Link>
                    <ConfirmationDialog
                      title={`Remove prerequisite?`}
                      description="If you continue, the prerequisite will be removed and will no longer apply to this subject."
                      triggerComponent={
                        <Button
                          title="Delete"
                          size="icon-sm"
                          variant="ghost"
                          className="text-destructive"
                        >
                          <Trash2 />
                        </Button>
                      }
                      submitButtonContent="Continue"
                      submitButtonVariant={{ variant: 'destructive' }}
                      onSubmit={async () => await onDetachClick(prereq.id)}
                    />
                  </div>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 items-center">
            <NewSubjectPrereqDialog subjectId={id} />
            <Link
              className={buttonVariants({ variant: 'outline', className: 'w-full' })}
              href={`/grades/encode/${id}`}
            >
              <Edit />
              Encode Grades
            </Link>
          </CardFooter>
        </Card>
      </aside>
      <div className="space-y-4 flex-1">
        <h4>Student List</h4>
        <SubjectStudentsTable subjectId={id} />
      </div>
    </main>
  )
}
