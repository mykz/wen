import { notFound } from 'next/navigation'

import { getPageBySlug } from '@/api/page'
import { getAuthUser } from '@/lib/auth'

import { PageEdit } from './_components/page-edit'
import { PageView } from './_components/page-view'

type SlugPageProps = {
  params: Promise<{ slug: string }>
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params

  const user = await getAuthUser()
  const { data: page } = await getPageBySlug({ slug })

  if (!page) return notFound()

  const isEditMode = Boolean(user?.id === page?.user_id)

  return user && isEditMode ? (
    <PageEdit page={page} user={user} />
  ) : (
    <PageView page={page} />
  )
}
