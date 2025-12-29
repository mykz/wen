import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react'

import debounce from 'lodash.debounce'
import slugify from 'slugify'

import { checkSlugAvailabilityAction } from '@/actions/page'

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

  const checkSlugAvailability = useCallback(() => {
    startChecking(async () => {
      if (!slug) {
        setIsNameAvailable(null)
        return
      }

      const { data } = await checkSlugAvailabilityAction({ slug })

      setIsNameAvailable(data ?? null)
    })
  }, [slug])

  const debouncedSlugAvailability = useMemo(
    () => debounce(() => checkSlugAvailability(), 500),
    [checkSlugAvailability],
  )

  useEffect(() => {
    if (slugProp === slug) return

    debouncedSlugAvailability()
    return () => debouncedSlugAvailability.cancel()
  }, [slug, slugProp, debouncedSlugAvailability])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = slugify(e.target.value, {
      lower: true,
      strict: true,
      trim: false,
    })

    setSlug(value)
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
