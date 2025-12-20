'use client'

import { useActionState } from 'react'

import { authAction } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

export function AuthForm() {
  const [state, action, pending] = useActionState(authAction, {
    success: false,
    errors: {},
    fields: { email: '' },
  })

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
                  placeholder="Enter your email"
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
