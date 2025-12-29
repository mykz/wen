import { ComponentProps, ReactNode } from 'react'

import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/utils/shadcn'

import { Button } from '../shadcn/ui/button'
import { Dialog, DialogContent } from '../shadcn/ui/dialog'
import { Drawer, DrawerContent, DrawerTitle } from '../shadcn/ui/drawer'

type PanelHeaderProps = {
  title: string
  description?: string
  action?: ComponentProps<typeof Button>[]
}

export function PanelHeader({ title, description, action }: PanelHeaderProps) {
  return (
    <div className="space-y-1 mb-0">
      <div className="flex gap-2 items-center">
        {title && (
          <div className="text-xl font-bold tracking-tight leading-tight grow">
            {title}
          </div>
        )}
        {action && (
          <div className="flex gap-2">
            {action.map((prop, index) => (
              <Button key={index} size="sm" className="shrink-0" {...prop} />
            ))}
          </div>
        )}
      </div>
      {description && (
        <div className="text-sm text-muted-foreground leading-tight">
          {description}
        </div>
      )}
    </div>
  )
}

export function PanelContent({ children }: ComponentProps<'div'>) {
  return <div className="mb-0">{children}</div>
}

export function PanelFooter({ children }: ComponentProps<'div'>) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <div className={cn('flex gap-2', isDesktop ? 'justify-end' : 'flex-col')}>
      {children}
    </div>
  )
}

type ContextPanelProps = {
  isOpen: boolean
  onChangeOpen?: (open: boolean) => void
  children: ReactNode
}

export function ContextPanel({
  isOpen,
  onChangeOpen: onChangeOpen,
  children,
}: ContextPanelProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const onOpenChange = (open: boolean) => onChangeOpen?.(open)

  if (isDesktop)
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent
          aria-describedby={undefined}
          className="sm:max-w-lg ring-0 px-4 space-y-4"
          showCloseButton={false}
        >
          {children}
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent
        className="px-4 space-y-4! pb-4"
        aria-describedby={undefined}
      >
        <DrawerTitle className="hidden" />
        {children}
      </DrawerContent>
    </Drawer>
  )
}
