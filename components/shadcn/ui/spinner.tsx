import { IconLoader } from '@tabler/icons-react'

import { cn } from '@/utils/shadcn'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <IconLoader
      phosphor="SpinnerIcon"
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  )
}

export { Spinner }
