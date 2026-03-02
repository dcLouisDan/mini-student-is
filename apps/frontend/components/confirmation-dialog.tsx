'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants, type ButtonVariantTypes } from '@/components/ui/button'
import { ComponentRenderFn, DialogTriggerState, HTMLProps } from '@base-ui/react'
import type { JSXElementConstructor, ReactElement, ReactNode } from 'react'

interface ConfirmationDialogProps {
  title?: string
  description?: string
  triggerComponent?:
    | ReactElement<unknown, string | JSXElementConstructor<any>>
    | ComponentRenderFn<HTMLProps<any>, DialogTriggerState>
    | undefined
  submitButtonContent?: ReactNode
  submitButtonVariant?: ButtonVariantTypes
  onSubmit?: () => void
  children?: ReactNode
}

export function ConfirmationDialog({
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. This will permanently alter the data from our servers.',
  triggerComponent = <Button variant="outline">Show Dialog</Button>,
  submitButtonContent = 'Continue',
  submitButtonVariant = { variant: 'default' },
  onSubmit = () => {},
  children,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={triggerComponent} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} className={buttonVariants(submitButtonVariant)}>
            {submitButtonContent}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
