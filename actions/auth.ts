'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import z from 'zod'

import { getGenericErrorMessage } from '@/supabase/error'
import { createClient } from '@/supabase/server'
import { SignUpSchema } from '@/zod/auth'

export async function signUpAction(_prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData)

  const validationResult = SignUpSchema.safeParse(data)

  // Don't send back the password
  const fields = { email: data.email as string }

  if (!validationResult.success)
    return {
      errors: z.flattenError(validationResult.error).fieldErrors,
      fields,
    }

  const supabase = await createClient()

  const response = await supabase.auth.signUp(validationResult.data)

  if (!response.error) {
    revalidatePath(`/page`)
    redirect(`/page`)
  }

  const errors: Record<string, string[]> = {
    email: [],
    password: [],
    generic: [],
  }

  switch (response.error.code) {
    case 'user_already_exists':
      errors.email.push('Email already in use. Please log in.')
      break
    default:
      errors.generic.push(getGenericErrorMessage(response))
      break
  }

  return {
    errors,
    fields,
  }
}
