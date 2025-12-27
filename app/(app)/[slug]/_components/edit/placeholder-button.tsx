import { ComponentProps } from 'react'

import { cva, VariantProps } from 'class-variance-authority'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const placeholderButtonVariants = cva('', {
  variants: {
    size: {
      lg: 'text-lg h-12',
      sm: 'text-sm h-10',
    },
  },
})

type PlaceholderButtonProps = ComponentProps<typeof Button> &
  VariantProps<typeof placeholderButtonVariants>

export function PlaceholderButton({
  className,
  size,
  ...props
}: PlaceholderButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        'border-dashed w-full',
        placeholderButtonVariants({ size }),
        className,
      )}
      {...props}
    />
  )
}
