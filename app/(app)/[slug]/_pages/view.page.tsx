import Link from 'next/link'

import { getPageSocialLinks } from '@/api/page/page-social-links'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/ui/avatar'
import { SOCIALS } from '@/constants/socials'
import { Page } from '@/types/page'
import { getfirstAndLastCharacter } from '@/utils/string'

type ViewPageProps = {
  page: Page
}

export async function ViewPage({ page }: ViewPageProps) {
  const { data: socialLinksData } = await getPageSocialLinks(page.id)
  const socialLinks = socialLinksData ?? []

  return (
    <div className="space-y-10">
      <div className="space-y-5 text-center">
        <Avatar className="size-20 rounded mx-auto">
          <AvatarImage src={page.image_url ?? undefined} />
          <AvatarFallback>
            {getfirstAndLastCharacter(page.name ?? '')}
          </AvatarFallback>
        </Avatar>

        <div className="">
          <h1 className="text-3xl font-bold tracking-tight w-full">
            {page.name}
          </h1>
          <div className="text-foreground underline text-base">
            @{page.slug}
          </div>
        </div>

        <p className="text-muted-foreground text-sm">{page.bio}</p>

        {Boolean(socialLinks.length) && (
          <div className="flex gap-4 justify-center">
            {socialLinks.map((link) => {
              const Icon = SOCIALS[link.type as keyof typeof SOCIALS].icon
              return (
                <Link key={link.id} href={link.link} target="_blank">
                  <Icon className="size-6 shrink-0" />
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
