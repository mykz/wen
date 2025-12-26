import { cache } from 'react'

import { ERROR_MESSAGES } from '@/constants/errors'
import { getAuthUser } from '@/lib/auth'
import { createClient } from '@/supabase/server'
import { ApiResponse } from '@/types/api'
import { Page } from '@/types/page'

export const getOrCreatePage = cache(async (): Promise<ApiResponse<Page>> => {
  const select = 'id, slug, name, bio, image_url'
  const supabase = await createClient()

  const user = await getAuthUser()
  if (!user) return { error: ERROR_MESSAGES.UNAUTHORIZED }

  const eResponse = await supabase
    .from('pages')
    .select(select)
    .eq('user_id', user.id)
    .maybeSingle()

  if (eResponse.error) return { error: ERROR_MESSAGES.GENERIC }
  if (eResponse.data) return { data: eResponse.data }

  const cResponse = await supabase
    .from('pages')
    .insert({
      user_id: user.id,
      slug: null,
      title: null,
      desc: null,
      image_url: null,
    })
    .select(select)
    .single()

  if (cResponse.error) return { error: ERROR_MESSAGES.GENERIC }

  return { data: cResponse.data }
})
