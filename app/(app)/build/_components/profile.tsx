'use client'

import { useEffect, useState } from 'react'

import debounce from 'lodash.debounce'

import { updateAuthUserPageAction } from '@/actions/page'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { BioField } from './bio-field'

function getfirstAndLastCharacter(name: string) {
  if (!name) return ''

  const [first, ...rest] = name.split(' ')

  return [first, rest.at(-1)].map((word) => word?.[0] ?? '').join('')
}

type ProfileProps = {
  imageUrl?: string | null
  name?: string | null
  bio?: string | null
}

export function Profile({
  imageUrl,
  name: nameProp,
  bio: bioProp,
}: ProfileProps) {
  const [name, setName] = useState(nameProp ?? undefined)
  const [bio, setBio] = useState(bioProp ?? undefined)

  useEffect(() => {
    const save = debounce(async () => {
      await updateAuthUserPageAction({ name, bio })
    }, 1000)

    save()

    return () => save.cancel()
  }, [name, bio])

  return (
    <div className="space-y-5">
      <Avatar className="size-20 rounded mx-auto">
        <AvatarImage src={imageUrl ?? undefined} />
        <AvatarFallback>{getfirstAndLastCharacter(name ?? '')}</AvatarFallback>
      </Avatar>

      <div className="space-y-2">
        <input
          type="text"
          name="name"
          value={name ?? ''}
          placeholder="Your Name"
          maxLength={32}
          onChange={(e) => setName(e.target.value)}
          className="text-3xl font-bold tracking-tight w-full text-center outline-none placeholder:text-foreground focus:placeholder:opacity-0"
        />

        <BioField value={bio ?? ''} onChange={(v) => setBio(v)} />
      </div>
    </div>
  )
}
