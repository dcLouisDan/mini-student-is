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
import { StudentForm } from '../student-form'
import { useState } from 'react'
import { toast } from 'sonner'

export default function NewStudentFormDialog() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Plus /> Add Student
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Fill in the form and click submit to add a new student to the system.
          </DialogDescription>
        </DialogHeader>
        <div>
          <StudentForm
            onSubmitSuccess={() => {
              toast.success('New students added')
              setOpen(false)
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
