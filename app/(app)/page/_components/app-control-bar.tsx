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
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
        isOpen={isOpen}
        onChangeOpen={setIsOpen}
      >
        <div>
          <h1>Edit profile</h1>
          <p>Make changes to your profile here. Click save when you're done.</p>
        </div>
      </DrawerDialog>
      <ControlBar actions={actions} />
    </>
  )
}
