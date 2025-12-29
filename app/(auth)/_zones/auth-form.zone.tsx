'use client'

import { useActionState, useEffect } from 'react'

import { toast } from 'sonner'

import { authAction } from '@/actions/auth'
import { Button } from '@/components/shadcn/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldSet,
} from '@/components/shadcn/ui/field'
import { Input } from '@/components/shadcn/ui/input'
import { Spinner } from '@/components/shadcn/ui/spinner'

export function AuthFormZone() {
  const [state, action, pending] = useActionState(authAction, {
    success: false,
    errors: {},
    fields: { email: '' },
  })

  useEffect(() => {
    const genericError = state.errors?.generic?.[0]

    if (!genericError) return

    toast.error(genericError)
  }, [state.errors?.generic])

  return (
    <>
      {state.success && (
        <div className="text-sm space-y-1">
          <p>We've sent you a temporary login link. </p>
          <p>
            Please check your inbox at{' '}
            <span className="font-bold">{state.fields?.email}</span>
          </p>
        </div>
      )}

      {!state.success && (
        <form action={action} noValidate>
          <FieldSet>
            <FieldGroup>
              <Field>
                <Input
                  type="email"
                  name="email"
                  defaultValue={state.fields?.email}
                  placeholder="Your email"
                />
                <FieldError>{state.errors?.email?.[0]}</FieldError>
              </Field>

              <Field>
                <Button type="submit" size="lg" disabled={pending}>
                  {pending && <Spinner />}
                  Continue
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      )}
    </>
  )
}
