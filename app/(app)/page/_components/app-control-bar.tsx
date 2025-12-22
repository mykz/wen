'use client'

import { useState } from 'react'

import { IconPalette, IconSettings, IconShare } from '@tabler/icons-react'

import { ControlBar } from '@/components/control-bar'
import { DrawerDialog } from '@/components/drawer-dialog'

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
      <DrawerDialog
        title="Share"
        isOpen={isOpen}
        onChangeOpen={setIsOpen}
        actions={[
          {
            children: 'Save',
            onClick: () => {
              setIsOpen(false)
            },
          },
        ]}
      >
        Some content
      </DrawerDialog>
      <ControlBar actions={actions} />
    </>
  )
}
