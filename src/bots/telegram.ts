import { Language } from '../utils/Language'

import { IsCommandData } from '../services/command-data'

import { MatchesRegexInput } from '../services/matches-regex-input'

import { NormalizeListInput } from '../utils/normalize-list'

import { OrganizeItemsByCategory } from '../services/organize-list'

import { GetSession, ResetSession } from '../session/session-store'

import { GetRandomBotResponse } from '../services/random-response'

export async function HandleTelegramChat(
  message: string,
  lang: Language,
  userId: string
): Promise<string> {
  const session = GetSession(userId)
  const text = message.toLowerCase()

  const commandResponse = IsCommandData(text, lang)
  if (commandResponse) return commandResponse

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
        return 'ℹ️ Você ainda não começou sua lista.'
      }

      session.collectingList = false
      const organized = await OrganizeItemsByCategory(session.listItems, lang)
      ResetSession(userId)

      const allRaw = session.listItems.map(i =>
        i.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
      )

      const used = Object.values(organized).flat().map(i =>
        i.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
      )

      const outros = allRaw.filter(i => !used.includes(i))

      let response = '*🧾 Lista organizada:*\n\n'

      for (const [category, items] of Object.entries(organized)) {
        response += `*📦 ${category}:*\n`
        items.forEach(item => response += `- ${item}\n`)
        response += '\n'
      }

      if (outros.length > 0) {
        response += `*📦 Outros:*\n`
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
    return `✅ Anotado: ${items.join(', ')}`
  }

  return GetRandomBotResponse('offTopic', lang)
}
/*export async function HandleTelegramChat(
  message: string,
  lang: Language,
  userId: string
): Promise<string> {
  const session = GetSession(userId)
  const text = message.toLowerCase()

  const commandResponse = IsCommandData(text, lang)
  if (commandResponse) return commandResponse
  
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

  if (MatchesRegexInput(text, 'ready', lang)) {
    if (!session.collectingList) {
      return 'ℹ️ Você ainda não começou sua lista.'
    }

    session.collectingList = false
    const organized = await OrganizeItemsByCategory(session.listItems)
    ResetSession(userId)

    const allRaw = session.listItems.map(i => 
      i.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
    )

    const used = Object.values(organized).flat().map(i => 
      i.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
    )
    const outros = allRaw.filter(i => !used.includes(i))

    let response = '*🧾 Lista organizada:*\n\n'

    for (const [category, items] of Object.entries(organized)) {
      response += `*📦 ${category}:*\n`
      items.forEach(item => response += `- ${item}\n`)
      response += '\n'
    }

    if (outros.length > 0) {
      response += `*📦 Outros:*\n`
      outros.forEach(item => response += `- ${item}\n`)
    }

    return response.trim()
  }

  if (session.collectingList) {
    const items = NormalizeListInput(text)
    session.listItems.push(...items)
    return `✅ Anotado: ${items.join(', ')}`
  }

  if (MatchesRegexInput(text, 'status_check', lang)) {
    session.collectingList = true
    session.listItems = []
    return GetRandomBotResponse('organizing', lang)
  }

  return GetRandomBotResponse('offTopic', lang)
}*/