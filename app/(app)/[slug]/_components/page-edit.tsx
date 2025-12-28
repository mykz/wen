import { User } from '@supabase/supabase-js'

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

      <div className="flex flex-col overflow-hidden h-full min-h-0">
        <div className="space-y-10 mb-5">
          <Profile />

          <PlaceholderButton size="lg">Add campaign</PlaceholderButton>
        </div>

        {/*<PlaceholderButton size="sm">Add secondary links</PlaceholderButton>*/}

        <ul className="flex-1 overflow-y-auto space-y-5 pr-1 scrollbar-thin no-scrollbar mask-[linear-gradient(to_bottom,transparent,black_16px,black_calc(100%-16px),transparent)] py-5">
          <li>
            <a href="#" target="_blank">
              Secondary link 1
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Secondary link 2
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Secondary link 3
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Secondary link 4
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Secondary link 5
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Secondary link 6
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Secondary link 7
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Secondary link 8
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Secondary link 9
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Secondary link 10
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Secondary link 6
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Secondary link 7
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Secondary link 8
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Secondary link 9
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Secondary link 10
            </a>
          </li>
        </ul>
      </div>

      <AppControlBar />
    </PageProvider>
  )
}
