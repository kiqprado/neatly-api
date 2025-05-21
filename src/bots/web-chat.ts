import { Language } from '../utils/Language'

import { MatchesRegexInput } from '../services/matches-regex-input'

import { NormalizeListInput } from '../utils/normalize-list'

import { OrganizeItemsByCategory } from '../services/organize-list'

import { GetSession, ResetSession } from '../session/session-store'

import { GetRandomBotResponse } from '../services/random-response'

export async function HandleWebChat(
  message: string,
  lang: Language,
  sessionId: string
): Promise<string> {
  const session = GetSession(sessionId)
  const text = message.toLowerCase()

  const matchedKey = MatchesRegexInput(text, lang)

  switch (matchedKey) {
    case 'introduction_neatly':
      return GetRandomBotResponse('introductionNeatly', lang)

    case 'intro':
      return GetRandomBotResponse('intro', lang)

    case 'organize':
      session.collectingList = true
      session.listItems = []
      return GetRandomBotResponse('starting', lang)

    case 'ready':
      if (!session.collectingList) {
        return 'Você ainda não começou sua lista.'
      }

      session.collectingList = false
      const organized = await OrganizeItemsByCategory(session.listItems, lang)
      ResetSession(sessionId)

      const allRaw = session.listItems.map(i =>
        i.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
      )

      const used = Object.values(organized).flat().map(i =>
        i.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
      )

      const outros = allRaw.filter(i => !used.includes(i))

      let response = '🧾 Lista organizada:\n\n'

      for (const [category, items] of Object.entries(organized)) {
        response += `📦 ${category}:\n`
        items.forEach(item => response += `- ${item}\n`)
        response += '\n'
      }

      if (outros.length > 0) {
        response += `📦 Outros:\n`
        outros.forEach(item => response += `- ${item}\n`)
      }

      return response.trim()

    case 'status_check':
      session.collectingList = true
      session.listItems = []
      return GetRandomBotResponse('organizing', lang)
  }

  if (session.collectingList) {
    const items = NormalizeListInput(text)
    session.listItems.push(...items)
    return `Anotado: ${items.join(', ')}`
  }

  return GetRandomBotResponse('offTopic', lang)
}
