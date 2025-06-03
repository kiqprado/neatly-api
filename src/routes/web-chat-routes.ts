import { FastifyInstance } from 'fastify'
import { MessageWebChatHandlerController } from '../controller/web-chat-controller'

export async function WebChatRoutes(app: FastifyInstance) {
  app.post('/chatweb', MessageWebChatHandlerController)
}