import { botResponse } from '../utils/bot-responses'

import { NormalizeListInput } from '../utils/normalize-list'

import { OrganizeItemsByCategory } from '../services/organize-list'

import { GetSession, ResetSession } from '../session/session-store'

type Category = keyof typeof botResponse
type Language = 'pt' | 'en'

function GetRandomBotResponse(category: Category, lang: Language) {
  const responses = botResponse[category]

  if(!responses) return 'Desculpe, não entendi 😅'

  const random = Math.floor(Math.random() * responses.length)

  return responses[random][lang]
}

export async function HandleTelegramChat(
  message: string,
  lang: Language,
  userId: string
): Promise<string> {
  const session = GetSession(userId)
  const text = message.toLowerCase()

  if (text.startsWith('/')) {
    if (text === '/start') {
      return '👋 Olá! Eu sou o bot organizador de listas!\n\n' +
             'Envie "/lista" para começar uma nova lista ou "/ajuda" para ver os comandos.'
    }

    if (text === '/ajuda') {
      return '📋 *Comandos disponíveis:*\n\n' +
             '/lista - Iniciar uma nova lista\n' +
             '/pronto - Finalizar e organizar a lista\n' +
             '/limpar - Cancelar a lista atual\n' +
             '/ajuda - Mostra esta mensagem'
    }

    if (text === '/limpar') {
      ResetSession(userId)
      return '🗑️ Lista atual foi limpa! Pode começar uma nova quando quiser.'
    }

    if (text === '/lista') {
      session.collectingList = true
      session.listItems = []
      return GetRandomBotResponse('starting', lang)
    }

    if (text === '/pronto') {
      if (!session.collectingList) {
        return 'ℹ️ Você não tem uma lista em andamento. Use /lista para começar.'
      }
    }
  }

  if (text.includes('oi') || text.includes('olá') || text.includes('e aí')) {
    return GetRandomBotResponse('intro', lang)
  }

  if (text.includes('organiza') || text.includes('lista') || text.includes('organize')) {
    session.collectingList = true
    session.listItems = []
    return GetRandomBotResponse('starting', lang)
  }

  if (text.includes('pronto') || text.includes('tá pronto') || 
      text.includes('terminei') || text.includes('acabou') || text === '/pronto') {
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

  return GetRandomBotResponse('offTopic', lang)
}