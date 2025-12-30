'use client'

import { ChangeEvent, useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { PanelSlugZone } from '@/components/zones/panels/panel-slug.zone'
import { usePage } from '@/contexts/page/page'

import { BioFieldComp } from '../../../_composites/bio-field.comp'
import { ProfileAvatarZone } from './profile-avatar.zone'
import { SocialLinksZone } from './social-links/social-links.zone'

export function ProfileZone() {
  const { updatePage, page, isUpdatingPage } = usePage()
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
    updatePage({ name: value })
  }
  const onChangeBio = (value: string) => {
    setBio(value)
    updatePage({ bio: value })
  }
  const onChangeSlug = (slug: string) => {
    setIsSlugEditing(false)
    updatePage({ slug })
  }

  useEffect(() => {
    if (isUpdatingPage) return

    if (isUpdatingPage || page.slug === pathname) return

    window.history.replaceState(null, '', `/${page.slug}`)
  }, [isUpdatingPage, page.slug, pathname, router])

  return (
    <div className="space-y-5">
      <ProfileAvatarZone />

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

      <BioFieldComp value={bio} onChange={onChangeBio} />

      <SocialLinksZone />

      <PanelSlugZone
        slug={page.slug ?? undefined}
        isOpen={isSlugEditing}
        onCompleted={onChangeSlug}
        onCancelled={() => setIsSlugEditing(false)}
        labels={{ title: 'Edit your link', button: 'Save' }}
      />
    </div>
  )
}
