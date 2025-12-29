import { useEffect, useState } from 'react'

import { IconBrandTiktok, IconBrandX } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'motion/react'

import { getSocialLinksAction } from '@/actions/page/page-social-links'
import { Button } from '@/components/shadcn/ui/button'
import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { SOCIALS } from '@/constants/socials'
import { usePage } from '@/contexts/page'
import { PageSocialLink } from '@/types/page'

import { SocialLinksPanelZone } from './social-links-panel.zone'

export function SocialLinksZone() {
  const { page } = usePage()

  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [links, setLinks] = useState<PageSocialLink[] | null>(null)

  useEffect(() => {
    ;(async () => {
      const { data, error } = await getSocialLinksAction(page.id)
      if (error) return

      setLinks(data ?? [])
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onClickLink = () => setIsPanelOpen(true)

  const motionLiProps = {
    className: 'flex gap-4 justify-center',
    initial: { opacity: 0, y: 3 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  }

  return (
    <div className="flex items-cente justify-center gap-4">
      <AnimatePresence mode="wait" initial={false}>
        {links === null ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex gap-4 justify-center"
          >
            <Skeleton className="size-6 shrink-0" />
            <Skeleton className="size-6 shrink-0" />
            <Skeleton className="size-6 shrink-0" />
          </motion.div>
        ) : links.length ? (
          <motion.div key="icons" {...motionLiProps}>
            {links.map((link, index) => {
              const Icon = SOCIALS[link.type as keyof typeof SOCIALS].icon
              return (
                <button
                  key={link.id ?? index}
                  type="button"
                  className="cursor-pointer"
                  onClick={onClickLink}
                >
                  <Icon className="size-6 shrink-0" />
                </button>
              )
            })}
          </motion.div>
        ) : (
          <motion.div key="empty" {...motionLiProps}>
            <button
              type="button"
              className="opacity-10 cursor-pointer"
              onClick={onClickLink}
            >
              <IconBrandTiktok className="size-6 shrink-0" />
            </button>
            <button
              type="button"
              className="opacity-10 cursor-pointer"
              onClick={onClickLink}
            >
              <IconBrandX className="size-6 shrink-0" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Button variant="outline" size="icon-xs" onClick={onClickLink}>
        +
      </Button>

      <SocialLinksPanelZone
        isOpen={isPanelOpen}
        onCancelled={(links) => {
          setLinks(links)
          setIsPanelOpen(false)
        }}
      />
    </div>
  )
}
