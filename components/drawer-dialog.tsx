'use client'

import { ReactNode } from 'react'

import { useMediaQuery } from '@/hooks/use-media-query'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer'

type DrawerDialogProps = {
  title?: string
  description?: string
  isOpen: boolean
  onChangeOpen?: (open: boolean) => void
  children: ReactNode
}
export function DrawerDialog({
  title,
  description,
  isOpen,
  onChangeOpen: onChangeOpen,
  children,
}: DrawerDialogProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const onOpenChange = (open: boolean) => {
    onChangeOpen?.(open)
  }

  if (isDesktop)
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          {(title || description) && (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        {(title || description) && (
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
        )}
        <div>{children}</div>
      </DrawerContent>
    </Drawer>
  )
}
