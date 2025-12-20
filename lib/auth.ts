import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/server'

export async function getAuthUser() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) return

  return data.user
}

export const requiresAuth = async () => {
  const user = await getAuthUser()

  if (!user) redirect('/login')

  return user
}
