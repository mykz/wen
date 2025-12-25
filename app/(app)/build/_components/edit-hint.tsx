'use client'

import { useState } from 'react'

import { IconX } from '@tabler/icons-react'

import { updateAuthUserEditHintAction } from '@/actions/auth'
import { Badge } from '@/components/ui/badge'

interface EditHintProps {
  isDismissed: boolean
}

export function EditHint({ isDismissed: isDismissedProp }: EditHintProps) {
  const [isDismissed, setIsDismissed] = useState(isDismissedProp)

  const onClick = async () => {
    setIsDismissed(true)

    await updateAuthUserEditHintAction()
  }

  if (isDismissed) return null

  return (
    <Badge variant="outline" onClick={onClick}>
      Tap anything to edit <IconX />{' '}
    </Badge>
  )
}
