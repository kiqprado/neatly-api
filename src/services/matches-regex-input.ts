import { PatternKey, RegexInputDataBot } from '../utils/regex-input-data-bot'

import { NormalizeListInput } from '../utils/normalize-list'

import { Language } from '../utils/Language'

export function MatchesRegexInput( text: string, patternKey: PatternKey, lang: Language ): boolean {
  const normalizedText = NormalizeListInput(text).join(' ')
  return RegexInputDataBot[patternKey][lang].test(normalizedText)
}