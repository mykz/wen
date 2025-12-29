import {
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react'

import { IconPlus, IconTrash } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'motion/react'
import { toast } from 'sonner'

import {
  deleteSocialLinkAction,
  getSocialLinksAction,
  upsertSocialLinkAction,
} from '@/actions/page/page-social-links'
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
import { usePage } from '@/contexts/page'
import { useDebounce } from '@/hooks/use-debounce'
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
  onCancelled: (links: PageSocialLink[]) => void
}

export function SocialLinksPanelZone({
  isOpen,
  onCancelled: onCancelledProp,
}: SocialLinksPanelZoneProps) {
  const { page } = usePage()
  const [isAddingLink, startAddingLink] = useTransition()

  const [links, setLinks] = useState<PageSocialLink[]>([])
  const [link, setLink] = useState<string | null>(null)
  const [linkAddError, setLinkAddError] = useState(false)
  const [linkAddCompleted, setLinkAddCompleted] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data, error } = await getSocialLinksAction(page.id)
      const newLinks = data ?? []

      if (error) return

      setLinks((prev) => {
        if (!newLinks.length) return prev

        return newLinks
      })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!linkAddCompleted) return

    const t = setTimeout(() => setLinkAddCompleted(false), 1500)

    return () => clearTimeout(t)
  }, [linkAddCompleted])

  const addLink = () => {
    startAddingLink(async () => {
      const linkValue = (link ?? '').trim()

      setLinkAddError(false)
      setLinkAddCompleted(false)

      const { data, error } = await upsertSocialLinkAction({
        type: getSocialType(linkValue),
        link: linkValue,
        sort_order: links.length + 1,
        page_id: page.id,
      })

      if (error) {
        toast.error(error)
        setLinkAddError(true)
        return
      }

      if (!data) return

      setLink(null)
      setLinks((prev) => [...prev, data])
      setLinkAddCompleted(true)
    })
  }

  const updateLink = (linkId: string, linkValue: string) => {
    startAddingLink(async () => {
      setLinkAddError(false)
      setLinkAddCompleted(false)

      const link = links.find((link) => link.id === linkId)
      if (!link) return

      const { data, error } = await upsertSocialLinkAction({
        ...link,
        link: linkValue,
      })

      if (error) {
        toast.error(error)
        setLinkAddError(true)
        return
      }

      if (!data) return

      setLinks((prev) => {
        return prev.map((link) => {
          if (link.id !== linkId) return link

          return { ...link, link: linkValue, type: getSocialType(linkValue) }
        })
      })

      setLinkAddCompleted(true)
    })
  }

  const debouncedUpdateLink = useDebounce(
    (linkId: string, linkValue: string) => {
      updateLink(linkId, linkValue)
    },
    500,
  )

  const deleteLink = async (linkId: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== linkId))

    const { data, error } = await deleteSocialLinkAction(linkId)

    if (error) {
      toast.error(error)
      return
    }

    if (!data) return
  }

  const updateLocalLink = (linkId: string, linkValue: string) => {
    setLinks((prev) => {
      return prev.map((link) => {
        if (link.id !== linkId) return link

        return { ...link, link: linkValue, type: getSocialType(linkValue) }
      })
    })

    debouncedUpdateLink(linkId, linkValue)
  }

  const onCancelled = () => onCancelledProp?.(links)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLink(e.target.value)

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    e.preventDefault()

    addLink()
  }

  const onKeyDownLink = (
    linkId: string,
    e: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key !== 'Enter') return

    e.preventDefault()

    const linkValue = (e.target as HTMLInputElement).value

    updateLocalLink(linkId, linkValue)
  }

  const onClickAdd = () => addLink()
  const onClickDelete = (linkId: string) => deleteLink(linkId)

  const AddIcon = useMemo(() => {
    const type = getSocialType(link ?? '')
    return SOCIALS[type as keyof typeof SOCIALS].icon
  }, [link])

  const feedback = useMemo(() => {
    if (isAddingLink)
      return (
        <span className="flex items-center gap-2">
          <Spinner /> Saving
        </span>
      )

    if (linkAddError || !linkAddCompleted) return

    return 'Saved!'
  }, [isAddingLink, linkAddError, linkAddCompleted])

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

              <Button type="button" onClick={onClickAdd} size="icon">
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
                              updateLocalLink(link.id, e.target.value)
                            }
                            onKeyDown={(e) => onKeyDownLink(link.id, e)}
                          />

                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={() => onClickDelete(link.id)}
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
