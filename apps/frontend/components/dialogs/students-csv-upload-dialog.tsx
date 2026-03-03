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
import { FileSpreadsheet } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Input } from '../ui/input'
import { client } from '@/lib/api'
import { handleRequestError } from '../handle-request-error'
import useStudents from '@/hooks/use-students'
import { Separator } from '../ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

export default function StudentCsvUploadDialog() {
  const { invalidate } = useStudents()
  const [open, setOpen] = useState(false)
  const [csvFile, setCsvFile] = useState<File | null>(null)

  const onSubmitClick = async () => {
    if (!csvFile) return
    try {
      const csvString = await csvFile.text()
      const { data } = await client.api.students.importCsv({
        body: {
          csvString,
        },
      })

      invalidate()
      toast.success(`${data.length} students added.`)
      setOpen(false)
    } catch (e) {
      handleRequestError(e)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline">
            <FileSpreadsheet /> Import from csv
          </Button>
        }
      />
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Import from csv</DialogTitle>
          <DialogDescription>Upload a csv file that contains student records.</DialogDescription>
        </DialogHeader>
        <ul className="list-disc ps-6 pe-4">
          <li> The csv file should contain the headers shown below. </li>
          <li>
            Make sure that the course code is consistent with the course records in the system.{' '}
          </li>
          <li> The birth date should follow the format YYYY-MM-DD (ex. 2001-01-01)</li>
        </ul>
        <div className="border rounded-lg overflow-hidden text-xs">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>studentNo</TableHead>
                <TableHead>firstName</TableHead>
                <TableHead>lastName</TableHead>
                <TableHead>email</TableHead>
                <TableHead>birthDate</TableHead>
                <TableHead>courseCode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>20250002231</TableCell>
                <TableCell>Juan</TableCell>
                <TableCell>Dela Cruz</TableCell>
                <TableCell>juan@gmail.com</TableCell>
                <TableCell>2000-01-01</TableCell>
                <TableCell>BSCOMPENG</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Separator />
        <Input
          type="file"
          accept="text/csv"
          onChange={(e) => {
            if (!e.target.files) return
            if (e.target.files.length == 0) return

            const file = e.target.files[0]

            setCsvFile(file)
          }}
        />
        <Button onClick={onSubmitClick}>Submit</Button>
      </DialogContent>
    </Dialog>
  )
}
