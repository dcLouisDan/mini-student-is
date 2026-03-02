'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { client } from '@/lib/api'
import { handleRequestError } from './handle-request-error'
import useSubjects from '@/hooks/use-subjects'
import { QueryCombobox } from './query-combo-box'
import CourseCombobox from './comboboxes/course-combobox'
import { BasicCombobox } from './basic-combobox'

type SubjectFormInputs = {
  courseId: string
  code: string
  title: string
  units: number
  passingGrade: number
}

export function SubjectForm({
  className,
  onSubmitSuccess = () => {},
  ...props
}: React.ComponentProps<'form'> & {
  onSubmitSuccess?: () => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<SubjectFormInputs>()
  const { invalidate } = useSubjects()
  const onSubmit: SubmitHandler<SubjectFormInputs> = async (data) => {
    try {
      await client.api.subjects.store({ body: { ...data } })

      invalidate()
      reset()
      onSubmitSuccess()
    } catch (e) {
      handleRequestError(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="code">Course</FieldLabel>
          <CourseCombobox
            value={watch('courseId')}
            onValueChange={(item) => setValue('courseId', item)}
          />
          <FieldError errors={[errors.courseId]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="subject-code">Code</FieldLabel>
          <Input {...register('code')} id="subject-code" type="text" placeholder="" required />
          <FieldError errors={[errors.code]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input {...register('title')} id="title" required />
          <FieldError errors={[errors.title]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="units">Units</FieldLabel>
          <Input type="number" {...register('units')} id="units" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="units">Passing Grade</FieldLabel>
          <Input type="number" {...register('passingGrade')} id="passingGrade" required />
        </Field>
        <Field>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
