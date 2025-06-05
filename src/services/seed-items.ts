import { prisma } from '../lib/prisma'

import { categories, items } from '../utils/market-data'

async function SeedDataBase() {
  await prisma.category.createMany({
    data: categories
  })

  await prisma.item.createMany({
    data: items
  })
}

SeedDataBase().then(() => {
  console.log('Seeded Succesfully')
}).catch((e) => {
  console.log(e)
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})