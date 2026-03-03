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
import { UserForm } from '../user-form'
import { useState } from 'react'
import { toast } from 'sonner'

export default function NewUserFormDialog() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Plus /> Add User
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Fill in the form and click submit to add a new user to the system.
          </DialogDescription>
        </DialogHeader>
        <div>
          <UserForm
            onSubmitSuccess={() => {
              toast.success('New user added')
              setOpen(false)
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
