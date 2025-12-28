import type { ReactNode } from 'react'

type PageLayoutProps = {
  children: ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="grid min-h-dvh w-screen place-items-center px-4 md:px-0">
      <div className="flex w-full max-w-80 flex-col text-center max-h-dvh overflow-hidden py-10">
        {children}
      </div>
    </div>
  )
}
