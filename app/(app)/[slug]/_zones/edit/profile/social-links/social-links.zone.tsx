import { useState } from 'react'

import { IconBrandTiktok, IconBrandX } from '@tabler/icons-react'

import { Button } from '@/components/shadcn/ui/button'
import { SOCIALS } from '@/constants/socials'
import { usePage } from '@/contexts/page/page'

import { SocialLinksPanelZone } from './social-links-panel.zone'

export function SocialLinksZone() {
  const { socialLinks } = usePage()

  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const onClickLink = () => setIsPanelOpen(true)

  return (
    <div className="flex items-cente justify-center gap-4">
      {socialLinks.length ? (
        socialLinks.map((link, index) => {
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
        })
      ) : (
        <>
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
        </>
      )}

      <Button variant="outline" size="icon-xs" onClick={onClickLink}>
        +
      </Button>

      <SocialLinksPanelZone
        isOpen={isPanelOpen}
        onCancelled={() => {
          setIsPanelOpen(false)
        }}
      />
    </div>
  )
}
