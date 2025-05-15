import Fastify from 'fastify'

import cors from '@fastify/cors'

import { config } from 'dotenv'

import { WebChatRoutes } from './routes/web-chat-routes'
import { setupDiscordBot } from './controllers/discord-controller'

config()

async function StartServer() {
  const app =  Fastify()

  await app.register(cors, {
    origin: true
  })

  app.register(WebChatRoutes)

  const discordBot = setupDiscordBot()
  await discordBot.login(process.env.DISCORD_TOKEN)
  console.log('Discord bot conectado!')

  try {
    await app.listen({ port: 3333, host: '0.0.0.0'})
    console.log('Server Running')
  } catch (err) {
    app.log(err)
    process.exit(1)
  }
}

StartServer()