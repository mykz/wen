'use server'

import { randomUUID } from 'crypto'

import { revalidatePath } from 'next/cache'

import { getAuthUser } from '@/lib/auth'
import { getUnauthorizedErrorMessage } from '@/supabase/error'
import { createClient } from '@/supabase/server'
import { ApiResponse } from '@/types/api'
import { Page } from '@/types/page'

export async function updateAuthUserPageAction(
  page: Partial<Page>,
): Promise<ApiResponse<Page>> {
  const supabase = await createClient()
  const user = await getAuthUser()

  if (!user) return { error: getUnauthorizedErrorMessage() }

  const response = await supabase
    .from('pages')
    .update(page)
    .eq('user_id', user.id)
    .select('id, slug, name, bio, image_url')
    .maybeSingle()

  console.log(response)

  if (response.error) return { error: response.error.message }

  revalidatePath('/build')

  return { data: response.data }
}

export async function uploadAuthUserPageAvatarAction(
  formData: FormData,
): Promise<ApiResponse<{ imageUrl: string }>> {
  const supabase = await createClient()
  const user = await getAuthUser()

  if (!user) return { error: getUnauthorizedErrorMessage() }

  const file = formData.get('file')
  if (!(file instanceof File)) return { error: 'Image file is required' }

  const ext = file.type.split('/')[1] ?? 'jpg'
  const path = `${user.id}/${randomUUID()}.${ext}`

  const arrayBuffer = await file.arrayBuffer()
  const bytes = new Uint8Array(arrayBuffer)

  const response = await supabase.storage.from('avatars').upload(path, bytes, {
    contentType: file.type,
    upsert: true,
  })

  console.log(response)

  if (response.error) return { error: response.error.message }

  const { data } = supabase.storage.from('avatars').getPublicUrl(path)

  return { data: { imageUrl: data.publicUrl } }
}
