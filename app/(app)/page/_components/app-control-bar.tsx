'use client'

import { useState } from 'react'

import { IconPalette, IconSettings } from '@tabler/icons-react'

import { ControlBar } from '@/components/control-bar'
import {
  ContextPanel,
  PanelContent,
  PanelFooter,
  PanelHeader,
} from '@/components/panel'
import { Button } from '@/components/ui/button'

export function AppControlBar() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      Component: IconPalette,
      onClick: () => {},
    },
    {
      Component: IconSettings,
      onClick: () => {},
    },
  ]

  return (
    <>
      <ContextPanel isOpen={isOpen} onChangeOpen={setIsOpen}>
        <PanelHeader title="Share" action={<Button size="xs">+ Add</Button>} />
        <PanelContent>
          <p>Share the current page with others</p>
        </PanelContent>
        <PanelFooter>
          <Button>Save</Button>
        </PanelFooter>
      </ContextPanel>

      <ControlBar actions={actions} />
    </>
  )
}
