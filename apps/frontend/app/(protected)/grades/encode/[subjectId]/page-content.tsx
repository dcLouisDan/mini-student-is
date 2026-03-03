'use client'

import useGrades from '@/hooks/use-grades'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { Data } from '@api-starter-kit/backend/data'
import { useEffect, useMemo, useState } from 'react'
import useAuth from '@/hooks/use-auth'
import { register } from 'module'
import { Input } from '@/components/ui/input'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { subjectQueryOptions } from '@/lib/query-options/subject-query-options'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { QUERY_KEYS } from '@/lib/query-options/query-keys'
import { toast } from 'sonner'
import { handleRequestError } from '@/components/handle-request-error'
import { client } from '@/lib/api'

export interface GradeRecordFields {
  gradeId: string
  studentId: string
  subjectId: string
  courseId: string
  prelim: number
  midterm: number
  finals: number
  finalGrade: number
  remarks: string
  encodedByUserId: string
}

export interface GradesFormFields {
  gradeRecords: GradeRecordFields[]
}

function getRemarks(grade: number, passingGrade: number = 0) {
  return grade >= passingGrade ? 'PASSED' : 'FAILED'
}

export default function GradePageContent({ id }: { id: string }) {
  const { grades } = useGrades({
    subjectEditId: id,
    defaultPageSize: 100,
    sortByStudent: 'last_name',
    sortOrderStudent: 'asc',
  })
  const { data: subject } = useQuery(subjectQueryOptions(id))
  const form = useForm<GradesFormFields>()
  const queryClient = useQueryClient()
  const onSubmit = async (data: GradesFormFields) => {
    const body = {
      gradeRecords: data.gradeRecords.map((record) => ({ ...record, id: record.gradeId })),
    }
    try {
      const res = await client.api.grades.store({
        body,
      })

      if (res) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GRADES],
        })

        toast.success('Saved Changes')
      }
    } catch (e) {
      handleRequestError(e)
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main className="flex flex-col flex-1 gap-4 p-4 pt-0">
          <div className="flex items-center justify-between gap-4">
            <h4 className="font-bold">{subject?.title}</h4>
            <Button>
              <Save /> Save Changes
            </Button>
          </div>
          <GradeSheetForm grades={grades} />
        </main>
      </form>
    </FormProvider>
  )
}

function GradeSheetForm({ grades }: { grades: Data.Grade[] }) {
  const [gradesInfoMap, setGradesInfoMap] = useState<Record<string, Data.Grade>>({})
  const { user } = useAuth()
  const { control, register, setValue } = useFormContext<GradesFormFields>()
  const { fields, append, replace } = useFieldArray({
    control,
    name: 'gradeRecords',
  })

  useEffect(() => {
    const map: Record<string, Data.Grade> = {}
    replace([])
    for (const grade of grades) {
      map[grade.id] = grade
      append({
        gradeId: grade.id,
        subjectId: grade.subjectId,
        studentId: grade.studentId,
        courseId: grade.courseId,
        prelim: grade.prelim ?? 0,
        midterm: grade.midterm ?? 0,
        finals: grade.finals ?? 0,
        finalGrade: grade.finalGrade ?? 0,
        remarks: grade.remarks ?? '',
        encodedByUserId: user?.id ?? '',
      })
    }

    setGradesInfoMap(map)
  }, [grades])

  const numberCellClass = 'h-full p-1 border border-gray-200 max-w-20 bg-background'
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student No.</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Prelim</TableHead>
            <TableHead>Midterm</TableHead>
            <TableHead>Finals</TableHead>
            <TableHead>Final Grade</TableHead>
            <TableHead>Passing Grade</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-muted/50">
          {fields.map((field, index) => {
            const gradeInfo = gradesInfoMap[field.gradeId]
            return (
              <TableRow key={field.id}>
                <TableCell>{gradeInfo.student?.studentNo}</TableCell>
                <TableCell>
                  {gradeInfo.student?.lastName}, {gradeInfo.student?.firstName}
                </TableCell>
                <TableCell className="p-0">
                  <Input
                    className={numberCellClass}
                    type="number"
                    {...register(`gradeRecords.${index}.prelim` as const)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className={numberCellClass}
                    type="number"
                    {...register(`gradeRecords.${index}.midterm` as const)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className={numberCellClass}
                    type="number"
                    {...register(`gradeRecords.${index}.finals` as const)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className={numberCellClass}
                    type="number"
                    {...register(`gradeRecords.${index}.finalGrade` as const)}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      setValue(`gradeRecords.${index}.finalGrade` as const, val)
                      setValue(
                        `gradeRecords.${index}.remarks` as const,
                        getRemarks(val, gradeInfo.subject?.passingGrade)
                      )
                    }}
                  />
                </TableCell>
                <TableCell>{gradeInfo.subject?.passingGrade}</TableCell>
                <TableCell>
                  <Input
                    className={numberCellClass}
                    {...register(`gradeRecords.${index}.remarks` as const)}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
