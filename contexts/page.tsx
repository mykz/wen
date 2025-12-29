'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
  useTransition,
} from 'react'

import { toast } from 'sonner'

import { upsertPageAction } from '@/actions/page/page'
import { useDebounce } from '@/hooks/use-debounce'
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

  const debouncedUpdate = useDebounce((nextPage: Page) => {
    startUpdating(async () => {
      const { data, error } = await upsertPageAction(nextPage)

      if (error || !data) {
        toast.error(error)
        return
      }

      setPage((prev) => ({ ...prev, ...data }))
    })
  }, 1000)

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
