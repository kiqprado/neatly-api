import { botResponse } from '../utils/bot-responses'

type Category = keyof typeof botResponse
type Language = 'pt' | 'en'

function getBotRandomResponse(category: Category, lang: Language) {
  const responses = botResponse[category]
  const random = Math.floor(Math.random() * responses.length)

  return responses[random][lang]
}

export function HandleWebChat(message: string, lang: Language): string {
  const text = message.toLowerCase()

  if (text.includes('oi') || text.includes('olá') || text.includes('e aí')) {
    return getBotRandomResponse('intro', lang)
  }

  if (text.includes('organiza') || text.includes('lista')) {
    return getBotRandomResponse('starting', lang)
  }

  if (text.includes('tá pronto') || text.includes('terminou')) {
    return getBotRandomResponse('organizing', lang)
  }

  if (text.includes('valeu') || text.includes('obrigado')) {
    return getBotRandomResponse('finally', lang)
  }

  return getBotRandomResponse('offTopic', lang)
}