import { z } from "zod"

const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  passwordHash: z.string(),
  emailVerifiedAt: z.coerce.date().nullable(),
  twoFactorSecret: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.output<typeof userSchema>
export default userSchema
