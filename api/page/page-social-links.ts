import { cache } from 'react'

import { ERROR_MESSAGES } from '@/constants/errors'
import { createClient } from '@/supabase/server'
import { ApiResponse } from '@/types/api'
import { PageSocialLink } from '@/types/page'
import { getAuthUser } from '@/utils/auth'

export const getPageSocialLinks = cache(
  async (pageId: string): Promise<ApiResponse<PageSocialLink[]>> => {
    const user = await getAuthUser()
    if (!user) return { error: ERROR_MESSAGES.UNAUTHORIZED }

    const supabase = await createClient()

    const response = await supabase
      .from('page_social_links')
      .select('id, page_id, link, type, sort_order')
      .eq('page_id', pageId)
      .order('sort_order', { ascending: true })

    if (response.error)
      return { error: ERROR_MESSAGES.FAILED_TO_GET_SOCIAL_LINKS }

    return { data: response.data }
  },
)
