import { prisma } from '../src/lib/prisma'

import { categories, items } from '../src/utils/market-data'

async function seedDataBase() {
  await prisma.category.createMany({
    data: categories
  })

  await prisma.item.createMany({
    data: items
  })
}

seedDataBase().then(() => {
  console.log('Seeded Successfully')
}).catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})