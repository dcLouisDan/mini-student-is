import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import SubjectReservationSelect from '../comboboxes/subject-reservation-select'
import { useState } from 'react'
import { handleRequestError } from '../handle-request-error'
import { QUERY_KEYS } from '@/lib/query-options/query-keys'
import { useQueryClient } from '@tanstack/react-query'
import { client } from '@/lib/api'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function SubjectReservationDialog({ studentId }: { studentId: string }) {
  const [values, setValues] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async () => {
    setIsSubmitting(true)
    try {
      const res = await client.api.subjectReservations.store({
        params: { id: studentId },
        body: {
          subjectIds: values,
        },
      })

      if (res) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.STUDENTS, studentId],
        })

        setValues([])
        setOpen(false)
        toast.success('Subjects reserved')
      }
    } catch (e) {
      handleRequestError(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="sm" className="w-full">
            <Plus /> Reserve Subject
          </Button>
        }
      />
      <DialogContent
        className={cn('sm:max-w-sm', isSubmitting && 'opacity-50 pointer-events-none')}
      >
        <DialogHeader>
          <DialogTitle>Reserve Subjects</DialogTitle>
          <DialogDescription>
            Select subjects that you want to take this semester. Only eligible subjects for this
            student will be displayed in the select input below.
          </DialogDescription>
        </DialogHeader>
        <SubjectReservationSelect values={values} setValues={setValues} studentId={studentId} />
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button onClick={onSubmit}>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
