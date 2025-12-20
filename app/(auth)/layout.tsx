import { ReactNode } from 'react'

import { Icon } from '@/components/logo'

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen w-screen items-center justify-center px-4 md:px-0">
      <div className="space-y-10 max-w-80 w-full text-center">
        <Icon className="mx-auto w-13 h-auto" />
        {children}
      </div>
    </div>
  )
}
