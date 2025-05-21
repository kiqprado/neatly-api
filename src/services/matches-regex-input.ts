import { UserInputDataRegex } from '../utils/user-input-data'

import { NormalizeListInput } from '../utils/normalize-list'

import { Language } from '../utils/Language'

export function MatchesRegexInput(text: string, lang: Language): string | null {
  const normalizedText = NormalizeListInput(text).join(' ')

  for (const [patternKey, regexes] of Object.entries(UserInputDataRegex)) {
    const regex = regexes[lang]

    if(!regex) continue

    if(regex.test(normalizedText)) {
      return patternKey
    }
  }

  return null
}