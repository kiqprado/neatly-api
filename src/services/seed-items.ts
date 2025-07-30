import { prisma } from '../lib/prisma'

import { categories, items } from '../utils/market-data'

if(process.env.SEED_ENABLED !== 'true') {
  console.log('Seed already done.')
  process.exit(0)
}


async function SeedDataBase() {
  const categoryCount = await prisma.category.count()
  const itemCount = await prisma.item.count()

  if( categoryCount > 0 || itemCount > 0) {
    console.log('DB Already seeded')
    return
  }

  await prisma.category.createMany({
    data: categories
  })

  await prisma.item.createMany({
    data: items
  })

  console.log('Seeded Succesfully')
}

SeedDataBase()
  .catch((e) => {
    console.log('Error on seed', e)
    process.exit(1)})
  .finally(() => {
    prisma.$disconnect()
  })