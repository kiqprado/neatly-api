import { FastifyInstance } from 'fastify'

import { MessageHandlerController } from '../controllers/web-chat-controller'

export async function WebChatRoutes(app: FastifyInstance) {
  app.post('/chatweb', MessageHandlerController)
}