import { ReactNode } from 'react'

import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

type PanelHeaderProps = {
  title: string
  description?: string
  action?: ReactNode
}

export function PanelHeader({ title, description, action }: PanelHeaderProps) {
  return (
    <div className="space-y-1 mb-0">
      <div className="flex gap-2">
        {title && (
          <div className="text-xl font-bold tracking-tight leading-tight grow">
            {title}
          </div>
        )}
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {description && (
        <div className="text-sm text-muted-foreground leading-tight">
          {description}
        </div>
      )}
    </div>
  )
}

type PanelContentProps = {
  children: ReactNode
}

export function PanelContent({ children }: PanelContentProps) {
  return <div className="mb-0">{children}</div>
}

type PanelFooterProps = {
  children: ReactNode
}

export function PanelFooter({ children }: PanelFooterProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <div className={cn('flex gap-2', isDesktop ? 'justify-end' : 'flex-col')}>
      {children}
    </div>
  )
}
