import { Language } from '../utils/language-pack'
import { GetChatSessionStore, ResetChatSessionStore } from '../session/chat-session-store'
import { MatchRegexDataInput } from '../services/matches-regex-data-input'
import { NormalizeItemsOnList } from '../services/normalize-items-on-list'
import { OrganizeListItemsByCategory } from '../services/organize-list'
import { GetRandomBotResponse } from '../services/get-random-bot-response'

export async function HandleWebChat(
  message: string,
  lang: Language,
  sessionId: string
): Promise<string> {
  const session = GetChatSessionStore(sessionId)
  const text = message.toLowerCase()
  const matchedKey = MatchRegexDataInput(text, lang)

  switch (matchedKey) {
    case 'introduction_neatly':
      return GetRandomBotResponse('introductionNeatly', lang)

    case 'intro':
      return GetRandomBotResponse('intro', lang)

    case 'organize':
      session.isCollectingList = true
      session.listItems = []
      return GetRandomBotResponse('starting', lang)

    case 'ready':
      if (!session.isCollectingList) {
        return 'Você ainda não começou sua lista.'
      }

      session.isCollectingList = false
      const organized = await OrganizeListItemsByCategory(session.listItems, lang)
      ResetChatSessionStore(sessionId)

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
      session.isCollectingList = true
      session.listItems = []
      return GetRandomBotResponse('organizing', lang)
  }

  if (session.isCollectingList) {
    const items = NormalizeItemsOnList(text)
    session.listItems.push(...items)
    return `Anotado: ${items.join(', ')}`
  }

  return GetRandomBotResponse('offTopic', lang)

}
