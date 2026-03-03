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
import useAuth from '@/hooks/use-auth'

export default function NewSubjectFormDialog() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  if (user?.role !== 'admin') return null
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
