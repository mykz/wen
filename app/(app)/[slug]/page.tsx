import { notFound } from 'next/navigation'

import { getPageBySlug } from '@/api/page'
import { getAuthUser } from '@/utils/auth'

import { EditPage } from './_pages/edit.page'
import { ViewPage } from './_pages/view.page'

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
    <EditPage page={page} user={user} />
  ) : (
    <ViewPage page={page} />
  )
}
