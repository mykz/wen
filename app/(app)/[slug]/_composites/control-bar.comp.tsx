'use client'

import { useState } from 'react'

import { IconDotsVertical, IconGraph, IconPalette } from '@tabler/icons-react'

import { BarControlComp } from '@/components/composites/bars/bar-control.comp'
import {
  ContextPanel,
  PanelContent,
  PanelHeader,
} from '@/components/primitives/panel.primitive'

export function ControlBarComp() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      Component: IconGraph,
      onClick: () => {},
    },
    {
      Component: IconPalette,
      onClick: () => {},
    },
    {
      Component: IconDotsVertical,
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
          action={[{ children: '+ Add', onClick: () => {} }]}
        />
        <PanelContent>
          <div>Campaigns list</div>
        </PanelContent>
      </ContextPanel>

      <BarControlComp actions={actions} />
    </>
  )
}
