import { z } from 'zod'

export const messageInputSchema = z.object({
  content: z.string().min(1),
  language: z.union([z.literal('pt'), z.literal('en')]).optional()
})

export type MessageInput = z.infer<typeof messageInputSchema>