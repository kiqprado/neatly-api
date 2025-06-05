import { Language } from '../utils/language-pack'
import { GetChatSessionStore, ResetChatSessionStore} from '../session/chat-session-store'
import { MatchRegexDataInput } from '../services/matches-regex-data-input'
import { NormalizeItemsOnList } from '../services/normalize-items-on-list'
import { OrganizeListItemsByCategory } from '../services/organize-list'
import { GetRandomBotResponse } from '../services/get-random-bot-response'


export async function HandleDiscordBot(
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

    case 'status_check':
      if (session.isCollectingList) {
        return GetRandomBotResponse('organizing', lang)
      } else {
        return 'No momento não estou organizando nenhuma lista.'
      }

    case 'ready':
      if (!session.isCollectingList || session.listItems.length === 0) {
        return 'Você ainda não começou ou não me mandou nenhum item pra organizar.'
      }

      session.isCollectingList = false
      const organized = await OrganizeListItemsByCategory(session.listItems, lang)
      ResetChatSessionStore(sessionId)

      const finalResponse = GetRandomBotResponse('finally', lang)
      return `${finalResponse}\n\n${organized}`
  }

  if (session.isCollectingList) {
    const items = NormalizeItemsOnList(text)
    session.listItems.push(...items)
    return `Anotado: ${items.join(', ')}`
  }

  return GetRandomBotResponse('offTopic', lang)
}