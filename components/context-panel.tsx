'use client'

import { ReactNode } from 'react'

import { useMediaQuery } from '@/hooks/use-media-query'

import { Dialog, DialogContent } from './ui/dialog'
import { Drawer, DrawerContent, DrawerTitle } from './ui/drawer'

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
          className="sm:max-w-lg ring-0 px-4 space-y-4"
          showCloseButton={false}
        >
          {children}
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="px-4 space-y-4! pb-4">
        <DrawerTitle className="hidden" />
        {children}
      </DrawerContent>
    </Drawer>
  )
}
