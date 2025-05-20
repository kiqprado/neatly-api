import { Language } from '../utils/Language'

import { MatchesRegexInput } from '../services/matches-regex-input'

import { NormalizeListInput } from '../utils/normalize-list'

import { OrganizeItemsByCategory } from '../services/organize-list'

import { GetSession, ResetSession } from '../session/session-store'

import { GetRandomBotResponse } from '../services/random-response'


export async function HandleWebChat(
  message: string, 
  lang: Language, 
  sessionId: string)
  : Promise<string> {
  const session = GetSession(sessionId)
  const text = message.toLowerCase()

  if (MatchesRegexInput(text, 'introduction_neatly', lang)) {
    return GetRandomBotResponse('introductionNeatly', lang)
  }

  if (MatchesRegexInput(text, 'intro', lang)) {
    return GetRandomBotResponse('intro', lang)
  }

  if (MatchesRegexInput(text, 'organize', lang)) {
    session.collectingList = true
    session.listItems = []
    return GetRandomBotResponse('starting', lang)
  }

  if (MatchesRegexInput(text, 'Ready', lang)) {
    if (!session.collectingList) {
      return 'Você ainda não começou sua lista.'
    }

    session.collectingList = false
    const organized = await OrganizeItemsByCategory(session.listItems)
    ResetSession(sessionId)

    const allRaw = session.listItems.map(i => i.
      toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '').trim())

    const used = Object.values(organized).flat().map(i => i.
      toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '').trim())
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

  if (MatchesRegexInput(text, 'status_check', lang)) {
    session.collectingList = true
    session.listItems = []
    return GetRandomBotResponse('organizing', lang)
  }

  return GetRandomBotResponse('offTopic', lang)
}
