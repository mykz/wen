import { IconBrandTiktok, IconBrandX } from '@tabler/icons-react'
import { notFound } from 'next/navigation'

import { getOrCreatePage } from '@/api/page'
import { Button } from '@/components/ui/button'
import { PageProvider } from '@/contexts/page'
import { requiresAuth } from '@/lib/auth'

import { AppControlBar } from './_components/app-control-bar'
import { EditHint } from './_components/edit-hint'
import { PlaceholderButton } from './_components/placeholder-button'
import { Profile } from './_components/profile'

export default async function BuildPage() {
  const user = await requiresAuth()
  const page = await getOrCreatePage()

  // TODO: Create a notFound page for this
  if (!page.data) return notFound()

  return (
    <PageProvider page={page.data}>
      <div className="absolute top-0 left-0 w-full py-4 px-2 bg-background flex flex-col gap-2 items-center justify-center space-y-10">
        <div className="flex items-center gap-2 justify-center text-base">
          <span className="bg-destructive rounded-full size-1.5 block" />
          <div className="text-foreground">@your-name</div>
        </div>

        <EditHint
          isDismissed={Boolean(user?.user_metadata?.dismissed_edit_hint)}
        />
      </div>

      <div className="flex h-screen w-screen items-center justify-center px-4 md:px-0">
        <div className="space-y-10 max-w-80 w-full text-center">
          <div className="space-y-10">
            <Profile />

            <PlaceholderButton size="lg">Add campaign</PlaceholderButton>

            <PlaceholderButton size="sm">Add secondary links</PlaceholderButton>

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
    </PageProvider>
  )
}
