import { NextResponse } from 'next/server'

import { createClient } from '@/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const response = await supabase.auth.exchangeCodeForSession(code)

    if (!response.error) return NextResponse.redirect(`${origin}/page`)
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback`)
}
