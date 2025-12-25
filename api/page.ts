import { cache } from 'react'

import { getAuthUser } from '@/lib/auth'
import {
  getGenericErrorMessage,
  getUnauthorizedErrorMessage,
} from '@/supabase/error'
import { createClient } from '@/supabase/server'
import { ApiResponse } from '@/types/api'
import { Page } from '@/types/page'

export const getOrCreateAuthUserPage = cache(
  async (): Promise<ApiResponse<Page>> => {
    const select = 'id, slug, name, bio, image_url'
    const supabase = await createClient()

    const user = await getAuthUser()
    if (!user) return { error: getUnauthorizedErrorMessage() }

    const eResponse = await supabase
      .from('pages')
      .select(select)
      .eq('user_id', user.id)
      .maybeSingle()

    if (eResponse.error) return { error: getGenericErrorMessage(eResponse) }
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

    console.log('created page', cResponse.error)

    if (cResponse.error) return { error: getGenericErrorMessage(cResponse) }

    return { data: cResponse.data }
  },
)
