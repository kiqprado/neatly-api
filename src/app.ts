import Fastify from 'fastify'
import cors from '@fastify/cors'
import { config } from 'dotenv'
import { WebChatRoutes } from './routes/web-chat-routes'

config()

async function StartServer() {
  const app = Fastify()

  app.register(cors, {
    origin: true
  })

  app.register(WebChatRoutes)

  try {
    await app.listen({ port: 3333, host: '0.0.0.0'})
    console.log('Server Running')
  } catch (err) {
    app.log(err)
    process.exit(1)
  }
}

StartServer()