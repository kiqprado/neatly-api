import { FastifyRequest, FastifyReply } from 'fastify'
import { MessageInputSchema } from '../services/message-input-schema'
import { HandleWebChatBot } from '../bots/web-chat-bot'

export async function MessageWebChatHandlerController(req: FastifyRequest, reply: FastifyReply) {
  const parsed = MessageInputSchema.safeParse(req.body)

  if(!parsed.success) {
    return reply.status(400).send({ error: 'Mensagem inválida'})
  }
  
  const { content, language = 'pt' } = parsed.data
  const sessionId = req.ip

  const response = await HandleWebChatBot(content, language, sessionId)

  return reply.status(200).send({
    sender: 'bot',
    content: response
  })
}