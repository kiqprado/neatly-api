import Fastify from 'fastify'

import cors from 'cors'

import { WebChatRoutes } from './routes/web-chat-routes'

async function StartServer() {
  const app =  Fastify()

  await app.register(cors, {
    origin: true
  })

  app.register(WebChatRoutes)

  try {
    await app.listen({ port: 3333, host: '0.0.0.0'})
    console.log(' Server Running')
  } catch (err) {
    app.log(err)
    process.exit(1)
  }
}

StartServer()