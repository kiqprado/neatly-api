import TelegramBot from 'node-telegram-bot-api'
import { HandleTelegramBot } from '../bots/telegram-bot'
import { config } from 'dotenv'

config()

export async function MessageTelegramController() {
  const token = process.env.TELEGRAM_TOKEN!
  const bot = new TelegramBot(token, { polling: true })

  bot.on('message', async (msg) => {
    const chatID = msg.chat.id
    const userID = msg.from?.id.toString() || 'unknown'
    const text = msg.text || ''

    if(!text || msg.from?.is_bot) return

    const response = await HandleTelegramBot(
      text,
      'pt',
      userID  
    )

    await bot.sendMessage(chatID, response, {
      parse_mode: 'Markdown',
      reply_to_message_id: msg.message_id
    })
  })

  console.log('Telegram Bot ta no ar!')

  return bot
}