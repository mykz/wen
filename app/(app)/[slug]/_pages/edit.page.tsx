import { User } from '@supabase/supabase-js'

import { PageProvider } from '@/contexts/page'
import { Page } from '@/types/page'

import { ControlBarComp } from '../_composites/control-bar.comp'
import { PlaceholderButtonComp } from '../_composites/placeholder-button.comp'
import { EditHintZone } from '../_zones/edit/edit-hint.zone'
import { ProfileZone } from '../_zones/edit/profile/profile.zone'

type EditPageProps = {
  page: Page
  user: User
}

export function EditPage({ page, user }: EditPageProps) {
  return (
    <PageProvider page={page}>
      <EditHintZone
        isDismissed={Boolean(user?.user_metadata?.dismissed_edit_hint)}
      />

      <div className="flex flex-col overflow-hidden h-full min-h-0">
        <div className="space-y-10 mb-5">
          <ProfileZone />

          <PlaceholderButtonComp size="lg">Add campaign</PlaceholderButtonComp>

          <PlaceholderButtonComp size="sm">
            Add secondary links
          </PlaceholderButtonComp>
        </div>

        {/*<ul className="flex-1 overflow-y-auto space-y-5 pr-1 scrollbar-thin no-scrollbar mask-[linear-gradient(to_bottom,transparent,black_16px,black_calc(100%-16px),transparent)] py-5">
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
        </ul>*/}
      </div>

      <ControlBarComp />
    </PageProvider>
  )
}
