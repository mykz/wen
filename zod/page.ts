import { z } from 'zod'

export const PageSocialLinkSchema = z.object({
  link: z.union([
    z.url('Please enter a valid link.'),
    z.email('Please enter a valid email.'),
  ]),
})
