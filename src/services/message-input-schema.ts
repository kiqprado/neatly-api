import { z } from 'zod'

export const MessageInputSchema = z.object({
  content: z.string().min(1),
  language: z.union([z.literal('pt'), z.literal('en'), z.literal('es')]).optional()
})

export type MessageInput = z.infer<typeof MessageInputSchema>