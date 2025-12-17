import { ReactNode } from 'react'

import { LogoText } from '@/components/logo'

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen w-screen items-center justify-center px-4 md:px-0">
      <LogoText className="absolute top-5 left-5 w-15 h-auto" />
      <div className="space-y-10 max-w-sm w-full text-center">{children}</div>
    </div>
  )
}
