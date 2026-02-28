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
import { CourseForm } from '../course-form'
import { useState } from 'react'
import { toast } from 'sonner'

export default function NewCourseFormDialog() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add Course
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogDescription>
            Fill in the form and click submit to add a new course to the system.
          </DialogDescription>
        </DialogHeader>
        <div>
          <CourseForm
            onSubmitSuccess={() => {
              toast.success('New courses added')
              setOpen(false)
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
