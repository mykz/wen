'use server'

import { ERROR_MESSAGES } from '@/constants/errors'
import { getAuthUser } from '@/lib/auth'
import { createClient } from '@/supabase/server'
import { ApiResponse } from '@/types/api'
import { Page } from '@/types/page'

export async function checkSlugAvailabilityAction({
  slug,
}: {
  slug: string
}): Promise<ApiResponse<boolean>> {
  const supabase = await createClient()

  const response = await supabase
    .from('pages')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (response.error) return { error: ERROR_MESSAGES.GENERIC }

  return { data: !Boolean(response.data) }
}

export async function upsertPageAction(
  page: Partial<Page>,
): Promise<ApiResponse<Page>> {
  const supabase = await createClient()

  const user = await getAuthUser()

  if (!user) return { error: ERROR_MESSAGES.UNAUTHORIZED }

  const response = await supabase
    .from('pages')
    .upsert({
      ...page,
      user_id: user.id,
    })
    .select('id, user_id, slug, name, bio, image_url')
    .maybeSingle()

  if (response.error) return { error: response.error.message }

  return { data: response.data }
}

export async function uploadPageImageAction({
  pageId,
  formData,
}: {
  pageId: string
  formData: FormData
}): Promise<ApiResponse<{ imageUrl: string }>> {
  const supabase = await createClient()
  const user = await getAuthUser()

  if (!user) return { error: ERROR_MESSAGES.UNAUTHORIZED }

  const file = formData.get('file')
  if (!(file instanceof File))
    return { error: ERROR_MESSAGES.NO_IMAGE_SELECTED }

  const path = `${user.id}/${pageId}`

  const arrayBuffer = await file.arrayBuffer()
  const bytes = new Uint8Array(arrayBuffer)

  const response = await supabase.storage.from('avatars').upload(path, bytes, {
    contentType: file.type,
    upsert: true,
  })

  if (response.error) return { error: ERROR_MESSAGES.FAILED_TO_UPLOAD_IMAGE }

  const { data } = supabase.storage.from('avatars').getPublicUrl(path)

  return { data: { imageUrl: data.publicUrl } }
}
