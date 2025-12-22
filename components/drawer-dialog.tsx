'use client'

import { ComponentProps, ReactNode } from 'react'

import { useMediaQuery } from '@/hooks/use-media-query'

import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer'

type DrawerDialogProps = {
  title?: string
  description?: string
  isOpen: boolean
  onChangeOpen?: (open: boolean) => void
  children: ReactNode
  actions?: ComponentProps<typeof Button>[]
}
export function DrawerDialog({
  title,
  description,
  isOpen,
  onChangeOpen: onChangeOpen,
  children,
  actions = [],
}: DrawerDialogProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const onOpenChange = (open: boolean) => {
    onChangeOpen?.(open)
  }

  if (isDesktop)
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg ring-0">
          {(title || description) && (
            <DialogHeader>
              {title && (
                <DialogTitle className="text-xl font-bold tracking-tight leading-normal">
                  {title}
                </DialogTitle>
              )}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}
          <div>{children}</div>
          {actions?.length && (
            <DialogFooter>
              {actions.map(({ children, ...props }, index) => (
                <Button key={index} {...props}>
                  {children}
                </Button>
              ))}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="space-y-4">
        {(title || description) && (
          <DrawerHeader className="px-4 py-0 text-left!">
            {title && (
              <DrawerTitle className="text-xl font-bold tracking-tight leading-normal">
                {title}
              </DrawerTitle>
            )}
            {description && (
              <DrawerDescription className="text-sm text-muted-foreground leading-normal">
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>
        )}
        <div className="px-4">{children}</div>
        {actions?.length && (
          <DrawerFooter className="px-4 py-0 pb-4">
            {actions.map(({ children, ...props }, index) => (
              <Button key={index} {...props}>
                {children}
              </Button>
            ))}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
