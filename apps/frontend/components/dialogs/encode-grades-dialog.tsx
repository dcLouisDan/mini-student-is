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
import { Edit } from 'lucide-react'
import { useState } from 'react'
import SubjectCombobox from '../comboboxes/subject-combobox'
import { useRouter } from 'next/navigation'

export default function EncodeGradesDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const onSubmitClick = async () => {
    router.push(`/grades/encode/${value}`)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Edit /> Encode Grades
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Encode Grades</DialogTitle>
          <DialogDescription>Pick a subject to edit its grade sheet.</DialogDescription>
        </DialogHeader>
        <SubjectCombobox value={value} onValueChange={setValue} />
        <DialogFooter>
          <Button onClick={onSubmitClick}>Proceed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
