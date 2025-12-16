import { cn } from '@/lib/utils'

export type PageHeaderCompProps = {
  title: string
  description?: string
  className?: string
}

export function PageHeaderComp({
  title,
  description,
  className,
}: PageHeaderCompProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <h1 className="text-4xl font-bold">{title}</h1>
      {description && (
        <p className="text-md text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
