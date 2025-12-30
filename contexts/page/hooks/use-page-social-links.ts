import { useCallback, useState, useTransition } from 'react'

import { toast } from 'sonner'

import {
  deleteSocialLinkAction,
  upsertSocialLinksAction,
} from '@/actions/page/page-social-links'
import { useDebounce } from '@/hooks/use-debounce'
import { Page, PageSocialLink } from '@/types/page'

const normalizeSortOrder = (links: PageSocialLink[]) =>
  links.map((link, index) => ({ ...link, sort_order: index + 1 })) ?? []

export type UsePageSocialLinks = {
  socialLinks: PageSocialLink[]
  isUpdatingSocialLinks: boolean
  isDeletingSocialLink: boolean
  isSocialLinksError: boolean | null
  updateSocialLinks: (updates: Partial<PageSocialLink>[]) => void
  deleteSocialLink: (id: string) => void
}

type UsePageSocialLinksProps = {
  page: Page
  socialLinks: PageSocialLink[]
}

export function usePageSocialLinks({
  page,
  socialLinks: socialLinksProp,
}: UsePageSocialLinksProps) {
  const [isUpdatingSocialLinks, startUpdatingSocialLinks] = useTransition()
  const [isDeletingSocialLink, startDeletingSocialLink] = useTransition()
  const [isSocialLinksError, setSocialLinksError] = useState<boolean | null>(
    null,
  )

  const [socialLinks, setSocialLinks] =
    useState<PageSocialLink[]>(socialLinksProp)

  const debouncedSocialLinksUpdate = useDebounce(
    (nextSocialLinks: PageSocialLink[]) => {
      startUpdatingSocialLinks(async () => {
        setSocialLinksError(null)

        if (!page?.slug) return

        const normalizedLinks = normalizeSortOrder(nextSocialLinks)

        const { data, error } = await upsertSocialLinksAction(
          page,
          normalizedLinks,
        )

        if (error || !data) {
          toast.error(error)
          setSocialLinksError(true)
          return
        }

        setSocialLinks(data ?? [])
      })
    },
    1000,
  )

  const updateSocialLinks = useCallback(
    (updates: Partial<PageSocialLink>[]) => {
      if (!updates) return

      debouncedSocialLinksUpdate(updates)
    },
    [debouncedSocialLinksUpdate],
  )

  const deleteSocialLink = useCallback((id: string) => {
    startDeletingSocialLink(async () => {
      setSocialLinksError(null)

      const { data, error } = await deleteSocialLinkAction(id)

      if (error || !data) {
        toast.error(error)
        setSocialLinksError(true)
        return
      }

      setSocialLinks((prev) =>
        normalizeSortOrder(prev.filter((link) => link.id !== id)),
      )
    })
  }, [])

  return {
    socialLinks,
    isUpdatingSocialLinks,
    isDeletingSocialLink,
    isSocialLinksError,
    updateSocialLinks,
    deleteSocialLink,
  }
}
