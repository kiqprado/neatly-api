import { FastifyRequest, FastifyReply } from 'fastify'

import { messageInputSchema } from '../schemas/message-schema'

import { HandleWebChat } from '../bots/web-chat'

export async function MessageHandlerController(req: FastifyRequest, reply: FastifyReply) {
  const parsed =  messageInputSchema.safeParse(req.body)

  if(!parsed.success) {
    return reply.status(400).send({ error: 'Mensagem inválida'})
  }

  const { content, language = 'pt' } = parsed.data

  const response = HandleWebChat(content, language)

  return reply.status(200).send({
    sender: 'bot',
    content: response
  })
}