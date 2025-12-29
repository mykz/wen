import { redirect } from 'next/navigation'

import { getPages } from '@/api/page/page'
import { BarControlComp } from '@/components/composites/bars/bar-control.comp'
import { requiresAuth } from '@/utils/auth'

import { NoPagesZone } from './_zones/no-pages.zone'

export default async function PagesPage() {
  await requiresAuth()

  const { data } = await getPages()
  const pages = data || []
  // redirect
  if (pages.length === 1) {
    const [page] = pages

    redirect(`/${page.slug}`)
  }

  // TODO: Show pages list when user logs in
  return (
    <>
      <div className="flex flex-col h-screen w-screen items-center justify-center px-4 md:px-0">
        <NoPagesZone />
      </div>

      <BarControlComp />
    </>
  )
}
