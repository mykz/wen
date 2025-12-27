import { cache } from 'react'

import { ERROR_MESSAGES } from '@/constants/errors'
import { getAuthUser } from '@/lib/auth'
import { createClient } from '@/supabase/server'
import { ApiResponse } from '@/types/api'
import { Page } from '@/types/page'

export const getPages = cache(async (): Promise<ApiResponse<Page[]>> => {
  const supabase = await createClient()

  const user = await getAuthUser()
  if (!user) return { error: ERROR_MESSAGES.UNAUTHORIZED }

  const response = await supabase
    .from('pages')
    .select('id, user_id, slug, name, bio, image_url')
    .eq('user_id', user.id)

  if (response.error) return { error: ERROR_MESSAGES.FAILED_TO_GET_PAGES_LIST }

  return { data: response.data }
})

export const getPageBySlug = cache(
  async ({ slug }: { slug: string }): Promise<ApiResponse<Page>> => {
    const supabase = await createClient()

    const response = await supabase
      .from('pages')
      .select('id, user_id, slug, name, bio, image_url')
      .eq('slug', slug)
      .maybeSingle()

    if (response.error) return { error: ERROR_MESSAGES.FAILED_TO_GET_PAGE }

    return { data: response.data }
  },
)
