'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { client } from '@/lib/api'
import { handleRequestError } from './handle-request-error'
import { Textarea } from './ui/textarea'
import useCourses from '@/hooks/use-courses'

type CourseFormInputs = {
  code: string
  name: string
  description: string
}

export function CourseForm({
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
  } = useForm<CourseFormInputs>()
  const { invalidate } = useCourses()
  const onSubmit: SubmitHandler<CourseFormInputs> = async (data) => {
    try {
      await client.api.courses.store({ body: { ...data } })

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
          <FieldLabel htmlFor="code">Code</FieldLabel>
          <Input {...register('code')} id="code" type="text" placeholder="" required />
          <FieldError errors={[errors.code]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input {...register('name')} id="name" required />
          <FieldError errors={[errors.name]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea {...register('description')} id="description" required />
        </Field>
        <Field>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
