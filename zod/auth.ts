import { z } from 'zod'

export const AuthSchema = z.object({
  email: z.email('Please enter a valid email.'),
})
