import { botResponse } from '../utils/bot-responses-data'

type Category = keyof typeof botResponse
type Language = 'pt' | 'en'

export function GetRandomBotResponse(category: Category, lang: Language) {
  const responses = botResponse[category]

  if(!responses) return 'Desculpe, não entendi 😅'

  const random = Math.floor(Math.random() * responses.length)

  return responses[random][lang]
}