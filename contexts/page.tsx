'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react'

import debounce from 'lodash.debounce'
import { toast } from 'sonner'

import { updatePageAction } from '@/actions/page'
import { Page } from '@/types/page'

type PageContextType = {
  page: Page
  isUpdating: boolean
  update: (updates: Partial<Page>) => void
}

const PageContext = createContext<PageContextType | null>(null)

type PageProviderProps = {
  page: Page
  children: ReactNode
}

export const PageProvider = ({
  page: pageProp,
  children,
}: PageProviderProps) => {
  const [isUpdating, startUpdating] = useTransition()

  const [page, setPage] = useState<Page>(pageProp)

  const debouncedUpdate = useMemo(
    () =>
      debounce(async (nextPage: Page) => {
        startUpdating(async () => {
          const { data, error } = await updatePageAction(nextPage)

          if (error || !data) {
            toast.error(error)
            return
          }

          setPage((prev) => ({ ...prev, ...data }))
        })
      }, 1000),
    [],
  )

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel()
    }
  }, [debouncedUpdate])

  const update = useCallback(
    (updates: Partial<Page>) => {
      if (!updates) return

      debouncedUpdate({ ...page, ...updates })
    },
    [page, debouncedUpdate],
  )

  const value = {
    page,
    isUpdating,
    update,
  }

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export function usePage() {
  const ctx = useContext(PageContext)

  if (!ctx) throw new Error('usePage must be used within a PageProvider')

  return ctx
}
