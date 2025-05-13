import { PrismaClient } from '@prisma/client'

import { categories, items } from '../src/utils/market-data'

const prisma = new PrismaClient()

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