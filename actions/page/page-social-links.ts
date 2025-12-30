'use server'

import { PostgrestResponse } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import z from 'zod'

import { getPageSocialLinks } from '@/api/page/page-social-links'
import { ERROR_MESSAGES } from '@/constants/errors'
import { createClient } from '@/supabase/server'
import { ApiResponse } from '@/types/api'
import { Page, PageSocialLink } from '@/types/page'
import { getAuthUser } from '@/utils/auth'
import { PageSocialLinkSchema } from '@/zod/page'

export async function getSocialLinksAction(
  pageId: string,
): Promise<ApiResponse<PageSocialLink[]>> {
  return getPageSocialLinks(pageId)
}

export async function upsertSocialLinksAction(
  page: Page,
  socialLinks: PageSocialLink[],
): Promise<ApiResponse<PageSocialLink[]>> {
  const supabase = await createClient()

  const user = await getAuthUser()
  if (!user) return { error: ERROR_MESSAGES.UNAUTHORIZED }

  const validationResult = z.array(PageSocialLinkSchema).safeParse(socialLinks)

  if (!validationResult.success)
    return { error: ERROR_MESSAGES.FAILED_TO_UPDATE_SOCIAL_LINKS }

  const normalized = socialLinks.map(({ id, ...rest }) => ({
    id: id ?? undefined,
    ...rest,
  }))

  const toInsert = normalized.filter((link) => !link.id)
  const toUpsert = normalized.filter((link) => !!link.id)

  let insertResponse: PostgrestResponse<PageSocialLink[]> | null = null
  let upsertResponse: PostgrestResponse<PageSocialLink[]> | null = null

  if (Boolean(toInsert.length)) {
    insertResponse = await supabase
      .from('page_social_links')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .insert(toInsert.map(({ id, ...rest }) => rest))
      .select('id, page_id, link, type, sort_order')

    if (insertResponse.error)
      return { error: ERROR_MESSAGES.FAILED_TO_UPDATE_SOCIAL_LINKS }
  }

  if (Boolean(toUpsert.length)) {
    upsertResponse = await supabase
      .from('page_social_links')
      .upsert(toUpsert)
      .select('id, page_id, link, type, sort_order')

    if (upsertResponse.error)
      return { error: ERROR_MESSAGES.FAILED_TO_UPDATE_SOCIAL_LINKS }
  }

  const response = await supabase
    .from('page_social_links')
    .select('id, page_id, link, type, sort_order')
    .eq('page_id', page.id)
    .order('sort_order', { ascending: true })

  revalidatePath(`/${page.slug}`)

  // Not ideal if the select fails but send back the original social links
  return { data: response.data ?? socialLinks }
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
