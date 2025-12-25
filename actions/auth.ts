'use server'

import z from 'zod'

import { getAuthUser } from '@/lib/auth'
import {
  getGenericErrorMessage,
  getUnauthorizedErrorMessage,
} from '@/supabase/error'
import { createClient } from '@/supabase/server'
import { AuthSchema } from '@/zod/auth'

type ErrorFields = Record<string, string[]>

export async function authAction(_prevState: unknown, formData: FormData) {
  const errors: ErrorFields = {
    email: [],
    generic: [],
  }

  const data = Object.fromEntries(formData)

  const validationResult = AuthSchema.safeParse(data)

  const fields = { email: data.email as string }

  if (!validationResult.success)
    return {
      success: false,
      errors: {
        ...errors,
        ...z.flattenError(validationResult.error).fieldErrors,
      },
      fields,
    }

  const supabase = await createClient()

  const response = await supabase.auth.signInWithOtp({
    email: validationResult.data.email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (response.error) errors.email.push(getGenericErrorMessage(response))

  return {
    success: !response.error,
    errors,
    fields,
  }
}

export async function updateAuthUserEditHintAction() {
  const supabase = await createClient()
  const user = await getAuthUser()

  if (!user) return { error: getUnauthorizedErrorMessage() }

  const response = await supabase.auth.updateUser({
    data: { dismissed_edit_hint: true },
  })

  if (response.error)
    return {
      error: response.error.message,
    }

  return { data: true }
}
