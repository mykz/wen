'use client'

import { ChangeEvent, useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { SlugPanel } from '@/components/slug-panel'
import { usePage } from '@/contexts/page'

import { Avatar } from './avatar'
import { BioField } from './bio-field'

export function Profile() {
  const { update, page, isUpdating } = usePage()
  const pathname = usePathname()
  const router = useRouter()

  const [name, setName] = useState(page.name ?? '')
  const [bio, setBio] = useState(page.bio ?? '')
  const [isSlugEditing, setIsSlugEditing] = useState(false)

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
  const onChangeSlug = (slug: string) => {
    setIsSlugEditing(false)
    update({ slug })
  }

  useEffect(() => {
    if (isUpdating) return

    if (isUpdating || page.slug === pathname) return

    window.history.replaceState(null, '', `/${page.slug}`)
  }, [isUpdating, page.slug, pathname, router])

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

        <div
          className="text-foreground underline text-base"
          onClick={() => setIsSlugEditing(true)}
        >
          @{page.slug}
        </div>

        <BioField value={bio} onChange={onChangeBio} />
      </div>

      <SlugPanel
        slug={page.slug ?? undefined}
        isOpen={isSlugEditing}
        onCompleted={onChangeSlug}
        onCancelled={() => setIsSlugEditing(false)}
        labels={{ title: 'Edit your name', button: 'Save' }}
      />
    </div>
  )
}
