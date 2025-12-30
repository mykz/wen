import { KeyboardEvent, useEffect, useMemo, useState } from 'react'

import { IconPlus, IconTrash } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'motion/react'

import {
  ContextPanel,
  PanelContent,
  PanelHeader,
} from '@/components/primitives/panel.primitive'
import { Button } from '@/components/shadcn/ui/button'
import {
  Field,
  FieldGroup,
  FieldSeparator,
  FieldSet,
} from '@/components/shadcn/ui/field'
import { Input } from '@/components/shadcn/ui/input'
import { Spinner } from '@/components/shadcn/ui/spinner'
import { SOCIALS } from '@/constants/socials'
import { usePage } from '@/contexts/page/page'
import { PageSocialLink } from '@/types/page'
import { safeHostname } from '@/utils/domain'
import { isValidEmail } from '@/utils/email'

const getSocialType = (link: string) => {
  const value = (link ?? '').trim()
  if (!value) return SOCIALS.WEBSITE.id

  if (isValidEmail(value)) return SOCIALS.EMAIL.id

  const hostname = safeHostname(link)
  if (!hostname) return SOCIALS.WEBSITE.id

  const social = Object.values(SOCIALS).find(
    ({ domain }) => domain && hostname.includes(domain),
  )

  return social?.id ?? SOCIALS.WEBSITE.id
}

type SocialLinksPanelZoneProps = {
  isOpen: boolean
  onCancelled: () => void
}

export function SocialLinksPanelZone({
  isOpen,
  onCancelled: onCancelledProp,
}: SocialLinksPanelZoneProps) {
  const {
    page,
    socialLinks,
    updateSocialLinks,
    deleteSocialLink,
    isUpdatingSocialLinks,
    isSocialLinksError,
  } = usePage()

  const [links, setLinks] = useState<PageSocialLink[]>(socialLinks)
  const [link, setLink] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    setLinks(socialLinks)
  }, [socialLinks])

  useEffect(() => {
    if (isUpdatingSocialLinks) return

    setIsSubmitting(false)

    if (!isSocialLinksError) setLink(null)
  }, [isUpdatingSocialLinks, isSocialLinksError])

  useEffect(() => {
    if (isUpdatingSocialLinks || isSubmitting) return
    if (isSocialLinksError) return

    setIsSaved(true)

    const t = window.setTimeout(() => setIsSaved(false), 1200)
    return () => window.clearTimeout(t)
  }, [isUpdatingSocialLinks, isSubmitting, isSocialLinksError])

  const onClickAdd = () => {
    if (!link) return

    setIsSubmitting(true)

    updateSocialLinks([
      ...links,
      {
        type: getSocialType(link),
        link: link,
        sort_order: links.length + 1,
        page_id: page.id,
      },
    ])
  }

  const onCancelled = () => onCancelledProp?.()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLink(e.target.value)

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    e.preventDefault()

    onClickAdd()
  }

  const onChangeLink = (linkId: string, linkValue: string) => {
    const nextLinks = socialLinks.map((link) => {
      if (link.id !== linkId) return link

      return { ...link, link: linkValue, type: getSocialType(linkValue) }
    })

    setLinks(nextLinks)
    updateSocialLinks(nextLinks)
  }
  const onKeyDownLink = (
    linkId: string,
    e: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key !== 'Enter') return

    e.preventDefault()

    const linkValue = (e.target as HTMLInputElement).value

    onChangeLink(linkId, linkValue)
  }

  const onClickDeleteLink = (linkId: string) => deleteSocialLink(linkId)

  const AddIcon = useMemo(() => {
    const type = getSocialType(link ?? '')
    return SOCIALS[type as keyof typeof SOCIALS].icon
  }, [link])

  const feedback = useMemo(() => {
    if (isUpdatingSocialLinks || isSubmitting)
      return (
        <span className="flex items-center gap-2">
          <Spinner /> Saving
        </span>
      )

    if (isSocialLinksError) return

    if (!isSaved) return

    return 'Saved'
  }, [isUpdatingSocialLinks, isSocialLinksError, isSubmitting, isSaved])

  return (
    <ContextPanel isOpen={isOpen} onChangeOpen={onCancelled}>
      <PanelHeader title="Social links" feedback={feedback} />
      <PanelContent>
        <FieldSet>
          <FieldGroup>
            <Field orientation="horizontal">
              {AddIcon && <AddIcon className="size-5 shrink-0" />}

              <Input
                type="text"
                placeholder="Link"
                name="link"
                value={link ?? ''}
                onChange={onChange}
                onKeyDown={onKeyDown}
              />

              <Button
                type="button"
                onClick={onClickAdd}
                size="icon"
                disabled={isSubmitting}
              >
                <IconPlus className="size-4 shrink-0" />
              </Button>
            </Field>
          </FieldGroup>
          {Boolean(links.length) && (
            <>
              <FieldSeparator />
              <FieldGroup className="flex-1 max-h-100 overflow-y-auto min-h-0 no-scrollbar">
                <AnimatePresence initial={false}>
                  {links.map((link, index) => {
                    const Icon = SOCIALS[link.type as keyof typeof SOCIALS].icon

                    return (
                      <motion.div
                        key={index}
                        layout
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Field orientation="horizontal">
                          <Icon className="size-5 shrink-0" />

                          <Input
                            type="text"
                            placeholder="Your link"
                            name="link"
                            value={link.link ?? ''}
                            onChange={(e) =>
                              onChangeLink(link.id, e.target.value)
                            }
                            onKeyDown={(e) => onKeyDownLink(link.id, e)}
                          />

                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={() => onClickDeleteLink(link.id)}
                          >
                            <IconTrash className="size-4 shrink-0 hover:text-destructive transition-colors" />
                          </Button>
                        </Field>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </FieldGroup>
            </>
          )}
        </FieldSet>
      </PanelContent>
    </ContextPanel>
  )
}
