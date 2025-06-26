import { z } from "zod"

export const usernameValidation = z
  .string()
  .min(2, 'Username must have at least 2 characters')
  .max(20, 'Username cannot have more than 20 characters')
  .regex(/^[A-Za-z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
})

export type SignUpFormData = z.infer<typeof signUpSchema>
