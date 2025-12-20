import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export type HeadlineProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: ReactNode
  className?: string
}

export function Headline({ as = 'h1', children, className }: HeadlineProps) {
  const Heading = as

  return (
    <Heading className={cn('text-2xl font-bold tracking-tight', className)}>
      {children}
    </Heading>
  )
}
