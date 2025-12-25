'use server'

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
