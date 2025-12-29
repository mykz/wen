import { ChangeEvent, useEffect, useState, useTransition } from 'react'

import slugify from 'slugify'

import { checkSlugAvailabilityAction } from '@/actions/page/page'
import { useDebounce } from '@/hooks/use-debounce'

import {
  ContextPanel,
  PanelContent,
  PanelHeader,
} from '../../primitives/panel.primitive'
import { Badge } from '../../shadcn/ui/badge'
import { Field, FieldGroup } from '../../shadcn/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '../../shadcn/ui/input-group'
import { Spinner } from '../../shadcn/ui/spinner'

type PanelSlugZoneProps = {
  slug?: string
  isOpen: boolean
  onCompleted: (slug: string) => void
  onCancelled: () => void
  labels: {
    title: string
    button: string
  }
}

export function PanelSlugZone({
  slug: slugProp,
  isOpen,
  onCompleted: onCompletedProp,
  onCancelled: onCancelledProp,
  labels,
}: PanelSlugZoneProps) {
  const [isChecking, startChecking] = useTransition()

  const [slug, setSlug] = useState(slugProp ?? '')
  const [isNameAvailable, setIsNameAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    setSlug((prev) => {
      if (prev === slugProp) return prev

      return slugProp ?? ''
    })
  }, [slugProp])

  const checkSlugAvailability = (slug: string) => {
    startChecking(async () => {
      if (!slug) {
        setIsNameAvailable(null)
        return
      }

      const { data } = await checkSlugAvailabilityAction({ slug })

      setIsNameAvailable(data ?? null)
    })
  }

  const debouncedSlugAvailability = useDebounce(
    (slug: string) => checkSlugAvailability(slug),
    500,
  )

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = slugify(e.target.value, {
      lower: true,
      strict: true,
      trim: false,
    })

    setSlug(value)
    debouncedSlugAvailability(value)
  }

  const resetState = () => {
    setSlug(slugProp ?? '')
    setIsNameAvailable(null)
  }

  const onComplete = () => {
    resetState()
    onCompletedProp?.(slug)
  }

  const onOpenChange = () => {
    resetState()
    onCancelledProp?.()
  }

  return (
    <ContextPanel isOpen={isOpen} onChangeOpen={onOpenChange}>
      <PanelHeader
        title={labels.title}
        action={[
          {
            children: labels.button,
            onClick: onComplete,
            disabled: !isNameAvailable || isChecking || !slug,
          },
        ]}
      />
      <PanelContent>
        <FieldGroup>
          <Field>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText className="font-mono">wen.bio/</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                autoComplete="off"
                name="slug"
                placeholder="your-name"
                value={slug ?? ''}
                onChange={onChange}
              />
              <InputGroupAddon align="inline-end">
                {isChecking && <Spinner className="size-4" />}

                {!isChecking && isNameAvailable !== null && (
                  <Badge
                    variant={isNameAvailable ? 'outline' : 'destructive'}
                    className="text-xs"
                  >
                    {isNameAvailable ? 'Available' : 'Taken'}
                  </Badge>
                )}
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </PanelContent>
    </ContextPanel>
  )
}
