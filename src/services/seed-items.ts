import { prisma } from '../lib/prisma'

import { categories, items } from '../utils/market-data'

if (process.env.SEED_ENABLED !== 'true') {
  console.log('[SEED] Skipped — SEED_ENABLED is not "true"')
  process.exit(0)
}

async function SeedDatabase() {
  const [categoryCount, itemCount] = await Promise.all([
    prisma.category.count(),
    prisma.item.count()
  ])

  if (categoryCount > 0 || itemCount > 0) {
    console.log('[SEED] Skipped — Database already seeded')
    return
  }

  await prisma.category.createMany({ data: categories })
  await prisma.item.createMany({ data: items })

  console.log('[SEED] Seeded successfully ✅')
}

SeedDatabase()
  .catch((err) => {
    console.error('[SEED] Failed to seed database:', err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
