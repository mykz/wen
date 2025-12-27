import { User } from '@supabase/supabase-js'
import { IconBrandTiktok, IconBrandX } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { PageProvider } from '@/contexts/page'
import { Page } from '@/types/page'

import { AppControlBar } from './edit/app-control-bar'
import { EditHint } from './edit/edit-hint'
import { PlaceholderButton } from './edit/placeholder-button'
import { Profile } from './edit/profile'

type PageEditProps = {
  page: Page
  user: User
}

export function PageEdit({ page, user }: PageEditProps) {
  return (
    <PageProvider page={page}>
      <EditHint
        isDismissed={Boolean(user?.user_metadata?.dismissed_edit_hint)}
      />

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

      <AppControlBar />
    </PageProvider>
  )
}
