import Link from 'next/link'

import { Headline } from '@/components/headline'

import { AuthForm } from '../_components/auth-form'

export default function LoginPage() {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Welcome to WEN</h1>
        <p className="text-base text-muted-foreground">Create your WEN.</p>
      </div>

      <AuthForm />
    </>
  )
}
