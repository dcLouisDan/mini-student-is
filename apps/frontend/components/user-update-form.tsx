'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { client } from '@/lib/api'
import { handleRequestError } from './handle-request-error'
import useUsers from '@/hooks/use-users'
import { BasicSelect } from './basic-select'
import { USER_ROLES_OPTIONS } from '@/lib/constants'
import { Data } from '@api-starter-kit/backend/data'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export type UpdateUserFormInputs = {
  fullName: string
  email: string
  password?: string
  passwordConfirmation?: string
  role: string
}

export function UpdateUserForm({
  className,
  user,
  onSubmitSuccess = () => {},
  ...props
}: React.ComponentProps<'form'> & {
  onSubmitSuccess?: () => void
  user: Data.User
}) {
  const { invalidate } = useUsers()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<UpdateUserFormInputs>({
    defaultValues: {
      fullName: user.fullName ?? '',
      email: user.email,
      role: user.role,
    },
  })
  const onSubmit: SubmitHandler<UpdateUserFormInputs> = async (data) => {
    try {
      await client.api.users.update({
        params: { id: user.id },
        body: { ...data },
      })

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
        <Accordion className="border p-2 rounded-lg bg-muted">
          <AccordionItem value="item-1">
            <AccordionTrigger>Update Password (optional)</AccordionTrigger>
            <AccordionContent className="pt-2 border-t">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input {...register('password')} id="password" type="password" />
                  <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                  <Input
                    id="confirm-password"
                    {...register('passwordConfirmation')}
                    type="password"
                  />
                  <FieldError errors={[errors.email]} />
                  <FieldDescription>Please confirm your password.</FieldDescription>
                </Field>
              </FieldGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Field>
          <Button type="submit">Update User</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
