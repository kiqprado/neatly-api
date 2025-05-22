import { Language } from '../utils/Language'

import { MatchesRegexInput } from '../services/matches-regex-input'

import { NormalizeListInput } from '../utils/normalize-list'

import { OrganizeItemsByCategory } from '../services/organize-list'

import { GetSession, ResetSession } from '../session/session-store'

import { GetRandomBotResponse } from '../services/random-response'

export async function HandleDiscordMessage(
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

    case 'status_check':
      if (session.collectingList) {
        return GetRandomBotResponse('organizing', lang)
      } else {
        return 'No momento não estou organizando nenhuma lista.'
      }

    case 'ready':
      if (!session.collectingList || session.listItems.length === 0) {
        return 'Você ainda não começou ou não me mandou nenhum item pra organizar.'
      }

      session.collectingList = false
      const organized = await OrganizeItemsByCategory(session.listItems, lang)
      ResetSession(sessionId)

      const finalResponse = GetRandomBotResponse('finally', lang)
      return `${finalResponse}\n\n${organized}`
  }

  if (session.collectingList) {
    const items = NormalizeListInput(text)
    session.listItems.push(...items)
    return `Anotado: ${items.join(', ')}`
  }

  return GetRandomBotResponse('offTopic', lang)
}