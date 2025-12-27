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

import { ContextPanel, PanelContent, PanelHeader } from './panel'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Field, FieldGroup } from './ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from './ui/input-group'
import { Spinner } from './ui/spinner'

type SlugPanelProps = {
  slug?: string
  isOpen: boolean
  onCompleted: (slug: string) => void
  onCancelled: () => void
  labels: {
    title: string
    button: string
  }
}

export function SlugPanel({
  slug: slugProp,
  isOpen,
  onCompleted: onCompletedProp,
  onCancelled: onCancelledProp,
  labels,
}: SlugPanelProps) {
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
        action={
          <Button
            size="sm"
            onClick={onComplete}
            disabled={!isNameAvailable || isChecking || !slug}
          >
            {labels.button}
          </Button>
        }
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
