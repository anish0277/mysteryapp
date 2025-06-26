import {z} from 'zod'

export const acceptMessageSchema = z.object({
  isAcceptingMessage: z.boolean()
});

export type acceptMessageFormData = z.infer<typeof acceptMessageSchema>
