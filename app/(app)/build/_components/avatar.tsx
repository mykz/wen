import { useRef, useTransition } from 'react'

import { toast } from 'sonner'

import { uploadPageImageAction } from '@/actions/page'
import {
  AvatarFallback,
  AvatarImage,
  Avatar as CNAvatar,
} from '@/components/ui/avatar'
import { usePage } from '@/contexts/page'
import { getfirstAndLastCharacter } from '@/lib/string'
import { cn } from '@/lib/utils'

export function Avatar() {
  const { page, update } = usePage()

  const [isUploading, startUpload] = useTransition()

  const inputRef = useRef<HTMLInputElement>(null)

  const onChange = () => {
    const file = inputRef.current?.files?.[0] ?? null
    if (!file) return

    startUpload(async () => {
      const formData = new FormData()
      formData.set('file', file)

      const { error, data } = await uploadPageImageAction({
        pageId: page.id,
        formData,
      })

      if (error) {
        toast.error(error)
        return
      }

      update({ image_url: data?.imageUrl ?? null })
    })
  }

  const onClick = () => inputRef.current?.click()

  return (
    <div>
      <input
        ref={inputRef}
        id="avatar"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={onChange}
      />

      <CNAvatar
        className={cn(
          'size-20 rounded mx-auto',
          isUploading && 'animate-pulse',
        )}
        onClick={onClick}
      >
        <AvatarImage src={page.image_url ?? undefined} />
        <AvatarFallback>
          {getfirstAndLastCharacter(page.name ?? '')}
        </AvatarFallback>
      </CNAvatar>
    </div>
  )
}
