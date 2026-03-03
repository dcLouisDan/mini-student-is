'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { client } from '@/lib/api'
import { handleRequestError } from './handle-request-error'
import { SignupFormInputs } from './signup-form'
import useUsers from '@/hooks/use-users'
import { BasicSelect } from './basic-select'
import { USER_ROLES_OPTIONS } from '@/lib/constants'

export function UserForm({
  className,
  onSubmitSuccess = () => {},
  ...props
}: React.ComponentProps<'form'> & {
  onSubmitSuccess?: () => void
}) {
  const { invalidate } = useUsers()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<SignupFormInputs>()
  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    try {
      await client.api.users.store({ body: { ...data } })

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
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input {...register('fullName')} id="name" type="text" placeholder="John Doe" required />
          <FieldError errors={[errors.fullName]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            {...register('email')}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="role">Role</FieldLabel>
          <BasicSelect
            items={USER_ROLES_OPTIONS}
            value={watch('role')}
            onValueChange={(value) => setValue('role', value)}
          />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input {...register('password')} id="password" type="password" required />
          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            {...register('passwordConfirmation')}
            type="password"
            required
          />
          <FieldError errors={[errors.email]} />
          <FieldDescription>Please confirm the user's password.</FieldDescription>
        </Field>

        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
