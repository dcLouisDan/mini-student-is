'use client'
import { cn, dateToFormatedString } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { client } from '@/lib/api'
import { handleRequestError } from './handle-request-error'
import useStudents from '@/hooks/use-students'
import CourseCombobox from './comboboxes/course-combobox'
import { DatePicker } from './date-picker'

type StudentFormInputs = {
  courseId: string
  firstName: string
  lastName: string
  email: string
  birthDate: string
}

export function StudentForm({
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
  } = useForm<StudentFormInputs>()
  const { invalidate } = useStudents()
  const onSubmit: SubmitHandler<StudentFormInputs> = async (data) => {
    try {
      await client.api.students.store({ body: { ...data } })

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
          <FieldLabel htmlFor="courseId">Course</FieldLabel>
          <CourseCombobox
            value={watch('courseId')}
            onValueChange={(item) => setValue('courseId', item)}
          />
          <FieldError errors={[errors.courseId]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="firstName">First Name</FieldLabel>
          <Input
            {...register('firstName')}
            id="firstName"
            type="text"
            placeholder="Juan"
            required
          />
          <FieldError errors={[errors.firstName]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
          <Input
            {...register('lastName')}
            id="lastName"
            type="text"
            placeholder="Dela Cruz"
            required
          />
          <FieldError errors={[errors.lastName]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            {...register('email')}
            id="email"
            type="email"
            placeholder="juan@gmail.com"
            required
          />
          <FieldError errors={[errors.firstName]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="birthDate">Birth Date</FieldLabel>
          <DatePicker
            value={new Date(watch('birthDate'))}
            onValueChange={(date) => setValue('birthDate', dateToFormatedString(date))}
          />
          <FieldError errors={[errors.firstName]} />
        </Field>
        <Field>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
