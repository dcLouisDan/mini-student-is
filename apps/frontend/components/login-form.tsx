'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { client } from '@/lib/api'

type LoginFormInputs = {
  email: string
  password: string
}

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>()
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const response = await client.api.auth.session.store({ body: data })

    console.log(response)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
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
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            {/* <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a> */}
          </div>
          <Input {...register('password')} id="password" type="password" required />
          <FieldError errors={[errors.password]} />
        </Field>
        <Field>
          <Button type="submit">Login</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
