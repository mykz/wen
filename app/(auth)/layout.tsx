import { ReactNode } from 'react'

import { LogoText } from '@/components/logo'

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen w-screen items-center justify-center px-4 md:px-0">
      <LogoText className="absolute top-5 left-5 w-15 h-auto" />

      {children}
    </div>
  )
}
