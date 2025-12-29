'use server'

import { ERROR_MESSAGES } from '@/constants/errors'
import { createClient } from '@/supabase/server'
import { ApiResponse } from '@/types/api'
import { PageSocialLink } from '@/types/page'
import { getAuthUser } from '@/utils/auth'
import { PageSocialLinkSchema } from '@/zod/page'

export async function getSocialLinksAction(
  pageId: string,
): Promise<ApiResponse<PageSocialLink[]>> {
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
}

export async function upsertSocialLinkAction(
  pageSocialLink: Partial<PageSocialLink>,
): Promise<ApiResponse<PageSocialLink>> {
  const supabase = await createClient()

  const user = await getAuthUser()
  if (!user) return { error: ERROR_MESSAGES.UNAUTHORIZED }

  const validationResult = PageSocialLinkSchema.safeParse(pageSocialLink)
  if (!validationResult.success)
    return { error: ERROR_MESSAGES.FAILED_TO_UPDATE_SOCIAL_LINK }

  const response = await supabase
    .from('page_social_links')
    .upsert(pageSocialLink)
    .select('id, page_id, link, type, sort_order')
    .maybeSingle()

  if (response.error)
    return { error: ERROR_MESSAGES.FAILED_TO_UPDATE_SOCIAL_LINK }

  return { data: response.data }
}

export async function deleteSocialLinkAction(
  linkId: string,
): Promise<ApiResponse<boolean>> {
  const supabase = await createClient()

  const user = await getAuthUser()
  if (!user) return { error: ERROR_MESSAGES.UNAUTHORIZED }

  const response = await supabase
    .from('page_social_links')
    .delete()
    .eq('id', linkId)

  if (response.error)
    return { error: ERROR_MESSAGES.FAILED_TO_DELETE_SOCIAL_LINK }

  return { data: true }
}
