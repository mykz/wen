import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getfirstAndLastCharacter } from '@/lib/string'
import { Page } from '@/types/page'

type PageViewProps = {
  page: Page
}

export function PageView({ page }: PageViewProps) {
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
      </div>
    </div>
  )
}
