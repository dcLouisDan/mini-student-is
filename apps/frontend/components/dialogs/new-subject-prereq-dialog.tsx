'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import SubjectPrereqCombobox from '../comboboxes/subject-prereq-combobox'
import { useState } from 'react'
import { handleRequestError } from '../handle-request-error'
import { client } from '@/lib/api'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/lib/query-options/query-keys'
import { toast } from 'sonner'

export default function NewSubjectPrereqDialog({ subjectId }: { subjectId: string }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const queryClient = useQueryClient()
  const onSubmitClick = async () => {
    try {
      const res = await client.api.subjectPrerequisites.store({
        params: { id: subjectId },
        body: {
          prerequisiteSubjectId: value,
        },
      })

      if (res) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.SUBJECTS, subjectId],
        })

        setValue('')
        setOpen(false)
        toast.success('Prerequisite added')
      }
    } catch (e) {
      handleRequestError(e)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="sm" className="w-full">
            <Plus /> Prerequisite Subject
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a prerequisite subject</DialogTitle>
          <DialogDescription>
            Choose a subject that must be completed before enrolling in this one.
          </DialogDescription>
        </DialogHeader>
        <SubjectPrereqCombobox subjectId={subjectId} value={value} onValueChange={setValue} />
        <DialogFooter>
          <Button onClick={onSubmitClick}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
