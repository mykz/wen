import { IconBrandTiktok, IconBrandX, IconX } from '@tabler/icons-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { requiresAuth } from '@/lib/auth'

import { AppControlBar } from './_components/app-control-bar'
import { PlaceholderButton } from './_components/placeholder'

export default async function Page() {
  await requiresAuth()

  return (
    <>
      <div className="absolute top-0 left-0 w-full py-4 px-2 bg-background flex flex-col gap-2 items-center justify-center space-y-10">
        <div className="flex items-center gap-2 justify-center text-base">
          <span className="bg-destructive rounded-full size-1.5 block" />
          <div className="text-foreground">@your-name</div>
        </div>

        <Badge variant="outline">
          Tap anything to edit <IconX />{' '}
        </Badge>
      </div>

      <div className="flex h-screen w-screen items-center justify-center px-4 md:px-0">
        <div className="space-y-10 max-w-80 w-full text-center">
          <div className="space-y-10">
            <div className="space-y-5">
              <Avatar className="size-20 rounded mx-auto">
                <AvatarImage src="" />
                <AvatarFallback>YN</AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Your Name</h1>
                <p className="text-sm text-muted-foreground">Your bio here</p>
              </div>
            </div>

            <PlaceholderButton size="lg">+ Add campaign</PlaceholderButton>

            <PlaceholderButton size="sm">
              + Add secondary links
            </PlaceholderButton>

            {/*<ul className="space-y-2">
              <li>
                <a href="#" target="_blank">
                  + Add a link
                </a>
              </li>
            </ul>*/}

            <ul className="flex gap-5 justify-center">
              <li className="opacity-20">
                <a href="#" target="_blank">
                  <IconBrandTiktok />
                </a>
              </li>
              <li className="opacity-20">
                <a href="#" target="_blank">
                  <IconBrandX />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <Button variant="outline" size="icon-xs">
                    +
                  </Button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <AppControlBar />
    </>
  )
}
