import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

import { InputPasswordComp } from '../_composites/input-password.comp'
import { PageHeaderComp } from '../_composites/page-header.comp'

export default function SignupPage() {
  return (
    <div className="space-y-10 max-w-md w-full">
      <PageHeaderComp
        title="wen bio?"
        description="Turns out, now's a good time."
      />

      <form>
        <FieldSet>
          <FieldGroup>
            <Field>
              <InputGroup>
                <InputGroupInput placeholder="username" />
                <InputGroupAddon>wen.bio/</InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
          <FieldSeparator />
          <FieldGroup>
            <Field>
              <Input type="email" id="email" placeholder="email" />
            </Field>
            <Field>
              <InputPasswordComp id="password" placeholder="password" />
            </Field>
            <Field>
              <Button type="submit" size="lg">
                Create account
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>

      <div className="text-sm text-muted-foreground">
        Already have an account? <Link href="/login">Login</Link>
      </div>
    </div>
  )
}
