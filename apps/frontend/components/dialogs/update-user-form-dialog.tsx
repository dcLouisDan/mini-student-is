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
import { Edit } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { UpdateUserForm } from '../user-update-form'
import { Data } from '@api-starter-kit/backend/data'

export default function UpdateUserFormDialog({ user }: { user: Data.User }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button title="Edit" size="icon-sm" variant="ghost">
            <Edit />{' '}
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User Info</DialogTitle>
          <DialogDescription>
            Fill in the form and click submit to the user's information.
          </DialogDescription>
        </DialogHeader>
        <div>
          <UpdateUserForm
            user={user}
            onSubmitSuccess={() => {
              toast.success('User updated')
              setOpen(false)
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
