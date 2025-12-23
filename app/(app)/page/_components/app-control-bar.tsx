'use client'

import { useState } from 'react'

import { IconPalette, IconSettings, IconShare } from '@tabler/icons-react'

import { ContextPanel } from '@/components/context-panel'
import { ControlBar } from '@/components/control-bar'
import { PanelContent, PanelFooter, PanelHeader } from '@/components/panel'
import { Button } from '@/components/ui/button'

export function AppControlBar() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      Component: IconShare,
      onClick: () => {
        setIsOpen(true)
      },
    },
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
        <PanelHeader
          title="Share"
          action={
            <Button variant="outline" size="xs">
              Create Link
            </Button>
          }
        />
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
