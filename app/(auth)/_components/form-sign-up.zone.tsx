'use client'

import { useActionState } from 'react'

import { signUpAction } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

import { InputPassword } from './input-password.comp'

export default function FormSignUp() {
  const [state, action, pending] = useActionState(signUpAction, {
    errors: {},
    fields: { email: '' },
  })

  return (
    <form action={action} noValidate>
      <FieldSet>
        <FieldGroup>
          <Field>
            <Input
              type="email"
              name="email"
              defaultValue={state.fields?.email}
              placeholder="Enter your email address"
            />
            <FieldError>{state.errors?.email?.[0]}</FieldError>
          </Field>

          <Field>
            <InputPassword
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            <FieldError>{state.errors?.password?.[0]}</FieldError>
          </Field>
          <Field>
            <Button type="submit" size="lg" disabled={pending}>
              {pending && <Spinner />}
              Create account
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
