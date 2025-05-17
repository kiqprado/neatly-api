import { NormalizeListInput } from '../utils/normalize-list'

import { OrganizeItemsByCategory } from '../services/organize-list'

import { GetSession, ResetSession } from '../session/session-store'

import { GetRandomBotResponse } from '../services/random-response'

type Language = 'pt' | 'en'

export async function HandleDiscordMessage(
  message: string,
  lang: Language,
  sessionId: string
): Promise<string> {
  const session = GetSession(sessionId)
  const text = message.toLowerCase()

  if (text.includes('oi') || 
      text.includes('olá') || 
      text.includes('e aí')) {
    return GetRandomBotResponse('intro', lang)
  }

  if (text.includes('organiza') || 
      text.includes('lista') || 
      text.includes('organize')) {
    session.collectingList = true
    session.listItems = []
    return GetRandomBotResponse('starting', lang)
  }

  if (text.includes('pronto') || 
      text.includes('tá pronto') || 
      text.includes('terminei') || 
      text.includes('acabou')) {
    if (!session.collectingList) {
      return 'Você ainda não começou sua lista.'
    }

    session.collectingList = false
    const organized = await OrganizeItemsByCategory(session.listItems)
    ResetSession(sessionId)

    const allRaw = session.listItems.map(i =>
      i.toLowerCase()
       .normalize('NFD')
       .replace(/[\u0300-\u036f]/g, '')
       .trim()
    )

    const used = Object.values(organized).flat().map(i =>
      i.toLowerCase()
       .normalize('NFD')
       .replace(/[\u0300-\u036f]/g, '')
       .trim()
    )

    const outros = allRaw.filter(i => !used.includes(i))

    let response = '🧾 Lista organizada:\n\n'

    for (const [category, items] of Object.entries(organized)) {
      response += `📦 ${category}:\n`
      for (const item of items) {
        response += `- ${item}\n`
      }
      response += '\n'
    }

    if (outros.length > 0) {
      response += `📦 Outros:\n`
      for (const item of outros) {
        response += `- ${item}\n`
      }
    }

    return response.trim()
  }

  if (session.collectingList) {
    const items = NormalizeListInput(text)
    session.listItems.push(...items)
    return `Anotado: ${items.join(', ')}`
  }

  return GetRandomBotResponse('offTopic', lang)
}