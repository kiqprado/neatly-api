import { prisma } from '../lib/prisma'

export async function OrganizeListItemsByCategory(rawListItems: string[]) {
  const cleanedItems = rawListItems.map(item => 
    item.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  )

  const allItems = await prisma.item.findMany({
    include: { category: true }
  })

  const matched: Record<string, string[]> = {}

  for(const item of allItems) {
    const itemNameNormalized = item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    if(cleanedItems.some(input => itemNameNormalized.includes(input))) {
      const cat = item.category.name

      if(!matched[cat]) matched[cat] = []
      matched[cat].push(item.name)
    }
  }

  return matched
}