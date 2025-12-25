'use client'

import { useState } from 'react'

import { IconPalette, IconSettings } from '@tabler/icons-react'

import { ControlBar } from '@/components/control-bar'
import { ContextPanel, PanelContent, PanelHeader } from '@/components/panel'
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
      onClick: () => {
        setIsOpen(true)
      },
    },
  ]

  return (
    <>
      <ContextPanel isOpen={isOpen} onChangeOpen={setIsOpen}>
        <PanelHeader
          title="Campaigns"
          action={<Button size="sm">+ Add</Button>}
        />
        <PanelContent>
          <div>Campaigns list</div>
        </PanelContent>
      </ContextPanel>

      <ControlBar actions={actions} />
    </>
  )
}
