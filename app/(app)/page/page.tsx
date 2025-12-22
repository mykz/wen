import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
} from '@tabler/icons-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { requiresAuth } from '@/lib/auth'

import { AppControlBar } from './_components/app-control-bar'

export default async function Page() {
  await requiresAuth()

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center px-4 md:px-0">
        <div className="space-y-10 max-w-80 w-full text-center">
          <div className="space-y-10">
            <div className="space-y-5">
              <Avatar className="size-20 rounded mx-auto">
                <AvatarImage src="" />
                <AvatarFallback>YN</AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Your Name</h1>
                <p className="text-sm text-muted-foreground">Your bio here</p>
              </div>
            </div>

            <div>
              <Button size="lg" className="w-full text-lg h-12">
                Main Link
              </Button>
            </div>

            <ul className="space-y-2">
              <li>
                <a href="#" target="_blank">
                  Secondary link
                </a>
              </li>
            </ul>

            <ul className="flex gap-5 justify-center">
              <li>
                <a href="#" target="_blank">
                  <IconBrandInstagram />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <IconBrandTiktok />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <IconBrandX />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <AppControlBar />
    </>
  )
}
