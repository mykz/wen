import { AuthResponse, PostgrestSingleResponse } from '@supabase/supabase-js'

export function getGenericErrorMessage(
  response: PostgrestSingleResponse<null> | AuthResponse,
) {
  const errorCode = response?.error?.code?.toUpperCase() || 0

  return `The timing was off. Try once more. (Code: ${errorCode})`
}

export function getUnauthorizedErrorMessage() {
  return 'Unauthorized. Please log in. (Code: 401)'
}
