import Link from 'next/link'

import { Headline } from '@/components/headline'

import { AuthForm } from '../_components/auth-form'

export default function LoginPage() {
  return (
    <>
      <Headline>Log in to WEN</Headline>

      <AuthForm />

      <div className="text-sm text-muted-foreground">
        Don't have an account? <Link href="/signup">Sign up</Link>
      </div>
    </>
  )
}
