'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { upsertPageAction } from '@/actions/page/page'
import { Button } from '@/components/shadcn/ui/button'
import { PanelSlugZone } from '@/components/zones/panels/panel-slug.zone'
import { ERROR_MESSAGES } from '@/constants/errors'

export function NoPagesZone() {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const onCompleted = async (slug: string) => {
    setIsOpen(false)

    const page = await upsertPageAction({
      slug,
    })

    if (page.error) {
      toast.error(ERROR_MESSAGES.FAILED_TO_CREATE_PAGE)
      return
    }

    router.push(`/${slug}`)
  }

  return (
    <>
      <div className="space-y-4 text-center">
        <p className="text-center text-sm text-muted-foreground">
          You don't have any pages yet.
        </p>
        <Button onClick={() => setIsOpen(true)}>Create a page</Button>
      </div>

      <PanelSlugZone
        isOpen={isOpen}
        onCancelled={() => setIsOpen(false)}
        onCompleted={onCompleted}
        labels={{
          title: 'Create a page',
          button: 'Create',
        }}
      />
    </>
  )
}
