import { z } from 'zod'

export const messageSchema = z.object({
    content: z.string()
        .min(10, { message: 'Content must have at least 10 characters' })
        .max(300, { message: 'Content cannot have more than 300 characters' })
})

export type MessageFormData = z.infer<typeof messageSchema>
