import { useEffect, useRef, useState } from 'react'

import { uploadAuthUserPageAvatarAction } from '@/actions/page'
import {
  AvatarFallback,
  AvatarImage,
  Avatar as CNAvatar,
} from '@/components/ui/avatar'

type AvatarProps = {
  imageUrl?: string | null
  fallback?: string
}

export function Avatar({ imageUrl, fallback }: AvatarProps) {
  const [file, setFile] = useState<File | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!file) return
    ;(async () => {
      console.log('file', file)

      const fileData = new FormData()
      fileData.set('file', file)

      const response = await uploadAuthUserPageAvatarAction(fileData)

      if (response.error) {
        // Wee need to add some toast
        return
      }

      console.log(response.data)
    })()
  }, [file])

  const onClick = () => inputRef.current?.click()

  const previewUrl = file ? URL.createObjectURL(file) : imageUrl

  return (
    <div>
      <input
        ref={inputRef}
        id="avatar"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <CNAvatar className="size-20 rounded mx-auto" onClick={onClick}>
        <AvatarImage src={previewUrl ?? undefined} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </CNAvatar>
    </div>
  )
}
