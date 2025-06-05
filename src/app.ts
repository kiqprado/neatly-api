import Fastify from 'fastify'
import cors from '@fastify/cors'
import { config } from 'dotenv'

import { WebChatRoutes } from './routes/web-chat-routes'
import { MessageTelegramController} from './controller/telegram-controller'
import { MessageDiscordController } from './controller/discord-controller'

config()

async function StartServer() {
  const app = Fastify()

  app.register(cors, {
    origin: true
  })

  app.register(WebChatRoutes)
  const telegramBot = MessageTelegramController()
  const discordBot = MessageDiscordController()
  await discordBot.login(process.env.DISCORD_TOKEN)

  console.log('Discord Bot Running on Server!')
  console.log(`${telegramBot} is running`)

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