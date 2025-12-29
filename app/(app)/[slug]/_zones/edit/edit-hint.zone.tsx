'use client'

import { useState } from 'react'

import { IconX } from '@tabler/icons-react'

import { updateDismissedEditHintAction } from '@/actions/user'
import { Badge } from '@/components/shadcn/ui/badge'
import { useMediaQuery } from '@/hooks/use-media-query'

interface EditHintZoneProps {
  isDismissed: boolean
}

export function EditHintZone({
  isDismissed: isDismissedProp,
}: EditHintZoneProps) {
  const [isDismissed, setIsDismissed] = useState(isDismissedProp)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const onClick = async () => {
    setIsDismissed(true)

    await updateDismissedEditHintAction()
  }

  if (isDismissed) return null

  return (
    <div className="absolute top-0 left-0 w-full pt-10 pb-10 px-2 bg-background flex flex-col gap-2 items-center justify-center space-y-10 cursor-pointer">
      <Badge variant="outline" onClick={onClick}>
        {isDesktop ? 'Click' : 'Tap'} anything to edit <IconX />{' '}
      </Badge>
    </div>
  )
}
