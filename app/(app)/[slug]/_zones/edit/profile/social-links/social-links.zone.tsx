import { useState } from 'react'

import { IconBrandTiktok, IconBrandX } from '@tabler/icons-react'

import {
  ContextPanel,
  PanelContent,
  PanelHeader,
} from '@/components/primitives/panel.primitive'
import { Button } from '@/components/shadcn/ui/button'

export function SocialLinksZone() {
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const onClickLink = () => setIsPanelOpen(true)

  return (
    <div>
      <ul className="flex gap-5 justify-center">
        <li className="opacity-10" onClick={onClickLink}>
          <IconBrandTiktok />
        </li>
        <li className="opacity-10" onClick={onClickLink}>
          <IconBrandX />
        </li>
        <li>
          <Button variant="outline" size="icon-xs" onClick={onClickLink}>
            +
          </Button>
        </li>
      </ul>

      <ContextPanel
        isOpen={isPanelOpen}
        onChangeOpen={() => setIsPanelOpen(false)}
      >
        <PanelHeader
          title="Social links"
          action={[{ children: 'Save', onClick: () => setIsPanelOpen(false) }]}
        />
        <PanelContent>
          <div>Link</div>
        </PanelContent>
      </ContextPanel>
    </div>
  )
}
