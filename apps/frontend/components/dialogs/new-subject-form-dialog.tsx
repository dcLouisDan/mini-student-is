'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { SubjectForm } from '../subject-form'
import { useState } from 'react'
import { toast } from 'sonner'
import CourseCombobox from '../comboboxes/course-combobox'

export default function NewSubjectFormDialog() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Plus /> Add Subject
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Subject</DialogTitle>
          <DialogDescription>
            Fill in the form and click submit to add a new subject to the system.
          </DialogDescription>
        </DialogHeader>
        <div>
          <SubjectForm
            onSubmitSuccess={() => {
              toast.success('New subjects added')
              setOpen(false)
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
