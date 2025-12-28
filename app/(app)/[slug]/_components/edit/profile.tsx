'use client'

import { ChangeEvent, useEffect, useState } from 'react'

import { IconBrandTiktok, IconBrandX } from '@tabler/icons-react'
import { usePathname, useRouter } from 'next/navigation'

import { SlugPanel } from '@/components/slug-panel'
import { Button } from '@/components/ui/button'
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

      <div>
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
          className="text-foreground underline text-base cursor-pointer"
          onClick={() => setIsSlugEditing(true)}
        >
          @{page.slug}
        </div>
      </div>

      <BioField value={bio} onChange={onChangeBio} />

      <ul className="flex gap-5 justify-center">
        <li className="opacity-10">
          <a href="#" target="_blank">
            <IconBrandTiktok />
          </a>
        </li>
        <li className="opacity-10">
          <a href="#" target="_blank">
            <IconBrandX />
          </a>
        </li>
        <li>
          <Button variant="outline" size="icon-xs">
            +
          </Button>
        </li>
      </ul>

      <SlugPanel
        slug={page.slug ?? undefined}
        isOpen={isSlugEditing}
        onCompleted={onChangeSlug}
        onCancelled={() => setIsSlugEditing(false)}
        labels={{ title: 'Edit your link', button: 'Save' }}
      />
    </div>
  )
}
