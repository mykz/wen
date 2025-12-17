import { AuthResponse, PostgrestSingleResponse } from '@supabase/supabase-js'

export function getGenericErrorMessage(
  response: PostgrestSingleResponse<null> | AuthResponse,
) {
  const errorCode = response?.error?.code?.toUpperCase() || 0

  return `Something went wrong. Try again later. (Code: ${errorCode})`
}

export function getUnauthorizedErrorMessage() {
  return 'Unauthorized. Please log in. (Code: 401)'
}
