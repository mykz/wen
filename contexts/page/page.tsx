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
import { Page, PageSocialLink } from '@/types/page'

import {
  UsePageSocialLinks,
  usePageSocialLinks,
} from './hooks/use-page-social-links'

type PageContextType = {
  page: Page
  isUpdatingPage: boolean
  updatePage: (updates: Partial<Page>) => void
} & UsePageSocialLinks

const PageContext = createContext<PageContextType | null>(null)

type PageProviderProps = {
  page: Page
  socialLinks: PageSocialLink[]
  children: ReactNode
}

export const PageProvider = ({
  page: pageProp,
  socialLinks: socialLinksProp,
  children,
}: PageProviderProps) => {
  const socialLinks = usePageSocialLinks({
    page: pageProp,
    socialLinks: socialLinksProp,
  })
  const [isUpdatingPage, startUpdatingPage] = useTransition()

  const [page, setPage] = useState<Page>(pageProp)

  const debouncedPageUpdate = useDebounce((nextPage: Page) => {
    startUpdatingPage(async () => {
      const { data, error } = await upsertPageAction(nextPage)

      if (error || !data) {
        toast.error(error)
        return
      }

      setPage((prev) => ({ ...prev, ...data }))
    })
  }, 1000)

  const updatePage = useCallback(
    (updates: Partial<Page>) => {
      if (!updates) return

      debouncedPageUpdate({ ...page, ...updates })
    },
    [page, debouncedPageUpdate],
  )

  const value = {
    page,
    isUpdatingPage,
    updatePage,
    ...socialLinks,
  }

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export function usePage() {
  const ctx = useContext(PageContext)

  if (!ctx) throw new Error('usePage must be used within a PageProvider')

  return ctx
}
