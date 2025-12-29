'use server'

import { ERROR_MESSAGES } from '@/constants/errors'
import { createClient } from '@/supabase/server'
import { getAuthUser } from '@/utils/auth'

export async function updateDismissedEditHintAction() {
  const supabase = await createClient()
  const user = await getAuthUser()

  if (!user) return { error: ERROR_MESSAGES.UNAUTHORIZED }

  const response = await supabase.auth.updateUser({
    data: { dismissed_edit_hint: true },
  })

  if (response.error)
    return {
      error: response.error.message,
    }

  return { data: true }
}
