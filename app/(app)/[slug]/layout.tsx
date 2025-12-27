import type { ReactNode } from 'react'

type PageLayoutProps = {
  children: ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex h-screen w-screen items-center justify-center px-4 md:px-0">
      <div className="space-y-10 max-w-80 w-full text-center">{children}</div>
    </div>
  )
}
