import Fastify from 'fastify'

import cors from '@fastify/cors'

import { config } from 'dotenv'

import { WebChatRoutes } from './routes/web-chat-routes'
import { SetupDiscordBot } from './controllers/discord-controller'
import { SetupTelegramBot } from './controllers/telegram-controller'
import { WebHookHandler } from './controllers/whatsapp-controller'

config()

async function StartServer() {
  const app =  Fastify()

  await app.register(cors, {
    origin: true
  })

  app.register(WebChatRoutes)

  const discordBot = SetupDiscordBot()
  await discordBot.login(process.env.DISCORD_TOKEN)

  const telegramBot = SetupTelegramBot()

  app.get('/webhook', WebHookHandler);
  app.post('/webhook', WebHookHandler);

  console.log('Discord Bot Running on Server!')
  console.log(`${telegramBot} is running`)

  try {
    await app.listen({ port: 3333, host: '0.0.0.0'})
    console.log('Server Running')
  } catch (err) {
    app.log(err)
    process.exit(1)
  }
}

StartServer()