import TelegramBot from 'node-telegram-bot-api'

import { HandleTelegramChat } from '../bots/telegram'

import { config } from 'dotenv'

config()

export function SetupTelegramBot() {
  const token = process.env.TELEGRAM_TOKEN!
  const bot = new TelegramBot(token, { polling: true })

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id
    const userId = msg.from?.id.toString() || 'unknown'
    const text = msg.text || ''

    if(!text || msg.from?.is_bot) return

    const response = await HandleTelegramChat(
      text,
      'pt',
      userId
    )

    await bot.sendMessage(chatId, response, {
      parse_mode: 'Markdown',
      reply_to_message_id: msg.message_id
    })
  })

  console.log('🤖 Telegram bot está rodando!')
  return bot
}