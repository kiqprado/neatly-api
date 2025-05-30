import { Language } from '../utils/language-pack'
import { NormalizeItemsOnList } from './normalize-items-on-list'
import { UserInputDataRegex } from '../utils/user-input-data'

export function MatchRegexDataInput(text: string, lang: Language) {
  const normalizedText = NormalizeItemsOnList(text).join(' ')

  for (const [patternKey, regexes] of Object.entries(UserInputDataRegex)) {
    const regex = regexes[lang]

    if(!regex) continue

    if(regex.test(normalizedText)) {
      return patternKey
    }
  }

  return null
}