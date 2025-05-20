import { Language } from '../utils/Language'

import { CommandServices } from '../utils/commands-services'

export function IsCommandData( input: string, lang: Language) {
  const command = input.trim().split(' ')[0].toLowerCase()

  const found = Object.values(CommandServices).find(item => item.triggers.includes(command))

  return found ? found.responses[lang] : null
}