import { ChangeEvent, useLayoutEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

const MAX_LINES = 4
const LINE_HEIGHT_PX = 20

const MAX_HEIGHT = MAX_LINES * LINE_HEIGHT_PX

function syncHeight(el: HTMLTextAreaElement) {
  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`
}

type BioFieldProps = {
  value: string
  onChange: (v: string) => void
  className?: string
}

export function BioField({
  value,
  onChange: onChangeProp,
  className,
}: BioFieldProps) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const lastOk = useRef(value)

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const el = ref.current
    if (!el) return

    const next = e.target.value
    const cursor = el.selectionStart ?? next.length

    el.value = next
    syncHeight(el)

    if (el.scrollHeight <= MAX_HEIGHT) {
      lastOk.current = next
      onChangeProp?.(next)
      return
    }

    el.value = lastOk.current
    syncHeight(el)

    requestAnimationFrame(() => {
      const pos = Math.max(0, Math.min(cursor - 1, el.value.length))
      el.selectionStart = el.selectionEnd = pos
    })
  }

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    syncHeight(el)
    lastOk.current = value
  }, [value])

  const rows = Math.min(Math.max(value.split('\n').length, 1), MAX_LINES)

  return (
    <textarea
      ref={ref}
      name="bio"
      value={value}
      maxLength={160}
      rows={rows}
      placeholder="Your bio"
      onChange={onChange}
      className={cn(
        'block w-full text-sm text-muted-foreground text-center max-h-[80px] resize-none overflow-y-auto outline-none placeholder:text-muted-foreground focus:placeholder:opacity-0',
        className,
      )}
    />
  )
}
