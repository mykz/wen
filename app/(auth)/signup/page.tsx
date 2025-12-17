import Link from 'next/link'

import { Headline } from '@/components/headline'

import FormSignUpZone from '../_components/form-sign-up.zone'

export default function SignupPage() {
  return (
    <>
      <Headline>wen bio?</Headline>

      <FormSignUpZone />

      <div className="text-sm text-muted-foreground">
        Already have an account? <Link href="/login">Login</Link>
      </div>
    </>
  )
}
