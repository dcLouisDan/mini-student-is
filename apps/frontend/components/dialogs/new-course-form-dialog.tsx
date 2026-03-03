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
import useAuth from '@/hooks/use-auth'

export default function NewCourseFormDialog() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  if (user?.role !== 'admin') return null
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Plus /> Add Course
          </Button>
        }
      />

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
