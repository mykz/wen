import { ComponentProps } from 'react'

import { cva, VariantProps } from 'class-variance-authority'

import { Button } from '@/components/shadcn/ui/button'
import { cn } from '@/utils/shadcn'

const placeholderButtonVariants = cva('', {
  variants: {
    size: {
      lg: 'text-lg h-12',
      sm: 'text-sm h-10',
    },
  },
})

type PlaceholderButtonCompProps = ComponentProps<typeof Button> &
  VariantProps<typeof placeholderButtonVariants>

export function PlaceholderButtonComp({
  className,
  size,
  ...props
}: PlaceholderButtonCompProps) {
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
