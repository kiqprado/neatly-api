import { prisma } from '../lib/prisma'
import { Language } from '../utils/language-pack'

type Translated = {
  pt: string
  en: string
  es: string
}

export async function OrganizeListItemsByCategory(rawListItems: string[], lang: Language) {
  const cleanedItems = rawListItems.map(item => 
    item.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  )

  const allItems = await prisma.item.findMany({
    include: { category: true }
  })

  const matched: Record<string, string[]> = {}

  
  for (const item of allItems) {
    const nameObj = item.name as Translated
    const categoryNameObj = item.category.name as Translated

    const itemName = nameObj[lang] || nameObj.pt
    const itemNameNormalized = itemName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    if (cleanedItems.some(input => itemNameNormalized.includes(input))) {
      const categoryName = categoryNameObj[lang] || categoryNameObj.pt

      if (!matched[categoryName]) matched[categoryName] = []
      matched[categoryName].push(itemName)
    }
  }

  return matched
}