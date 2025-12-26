'use server'

import { revalidatePath } from 'next/cache'

import { ERROR_MESSAGES } from '@/constants/errors'
import { getAuthUser } from '@/lib/auth'
import { createClient } from '@/supabase/server'
import { ApiResponse } from '@/types/api'
import { Page } from '@/types/page'

export async function updatePageAction(
  page: Partial<Page>,
): Promise<ApiResponse<Page>> {
  const supabase = await createClient()
  const user = await getAuthUser()

  if (!user) return { error: ERROR_MESSAGES.UNAUTHORIZED }

  const response = await supabase
    .from('pages')
    .update(page)
    .eq('user_id', user.id)
    .select('id, slug, name, bio, image_url')
    .maybeSingle()

  if (response.error) return { error: response.error.message }

  revalidatePath('/build')

  return { data: response.data }
}

type UploadPageImageActionProps = {
  pageId: string
  formData: FormData
}

export async function uploadPageImageAction({
  pageId,
  formData,
}: UploadPageImageActionProps): Promise<ApiResponse<{ imageUrl: string }>> {
  const supabase = await createClient()
  const user = await getAuthUser()

  if (!user) return { error: ERROR_MESSAGES.UNAUTHORIZED }

  const file = formData.get('file')
  if (!(file instanceof File)) return { error: 'No image selected.' }

  const path = `${user.id}/${pageId}`

  const arrayBuffer = await file.arrayBuffer()
  const bytes = new Uint8Array(arrayBuffer)

  const response = await supabase.storage.from('avatars').upload(path, bytes, {
    contentType: file.type,
    upsert: true,
  })

  if (response.error) return { error: "That didn't upload. Try again." }

  const { data } = supabase.storage.from('avatars').getPublicUrl(path)

  return { data: { imageUrl: data.publicUrl } }
}
