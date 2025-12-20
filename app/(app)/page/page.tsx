import { requiresAuth } from '@/lib/auth'

export default async function Page() {
  await requiresAuth()
  // if user has a page just show that
  // if user has no pages show the create page
  return <div>page</div>
}
