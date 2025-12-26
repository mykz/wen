'use client'

import { ChangeEvent, useEffect, useState } from 'react'

import { usePage } from '@/contexts/page'

import { Avatar } from './avatar'
import { BioField } from './bio-field'

export function Profile() {
  const { update, page } = usePage()

  const [name, setName] = useState(page.name ?? '')
  const [bio, setBio] = useState(page.bio ?? '')

  useEffect(() => setName(page.name ?? ''), [page.name])
  useEffect(() => setBio(page.bio ?? ''), [page.bio])

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setName(value)
    update({ name: value })
  }
  const onChangeBio = (value: string) => {
    setBio(value)
    update({ bio: value })
  }

  return (
    <div className="space-y-5">
      <Avatar />

      <div className="space-y-2">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your Name"
          maxLength={32}
          onChange={onChangeName}
          className="text-3xl font-bold tracking-tight w-full text-center outline-none placeholder:text-foreground focus:placeholder:opacity-0"
          autoComplete="off"
        />

        <BioField value={bio} onChange={onChangeBio} />
      </div>
    </div>
  )
}
