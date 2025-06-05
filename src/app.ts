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

  const PORT = 3333
  
  try {
    await app.listen({ port: PORT, host: '0.0.0.0'})
    console.log(`Server Running on ${PORT}`)
  } catch (err) {
    app.log(err)
    process.exit(1)
  }
}

StartServer()