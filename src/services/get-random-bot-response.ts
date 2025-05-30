import { BotResponse } from '../utils/bot-responses-data'
import { Language } from '../utils/language-pack'

type Category = keyof typeof BotResponse

export function GetRandomBotResponse(category: Category, lang: Language) {
  const responses = BotResponse[category]

  if(!responses) return 'Desculpe, não entendi 😅'

  const random = Math.floor(Math.random() * responses.length)

  return responses[random][lang]
}