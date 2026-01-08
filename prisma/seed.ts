import { prisma } from '../src/lib/prisma'
import bcrypt from 'bcryptjs'

async function seed() {
  console.log('Seeding database...')

  const adminEmail = 'admin@travelbuddy.local'
  const demoEmail = 'demo@travelbuddy.local'

  const adminPasswordHash = await bcrypt.hash('Admin@12345', 12)
  const demoPasswordHash = await bcrypt.hash('Demo@12345', 12)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: 'ADMIN',
      isPremium: true,
    },
    create: {
      email: adminEmail,
      password: adminPasswordHash,
      role: 'ADMIN',
      isPremium: true,
      profile: {
        create: {
          fullName: 'Platform Admin',
          bio: 'Admin account for managing the application.',
          currentLocation: 'Remote',
          travelInterests: ['moderation', 'operations'],
          visitedCountries: [],
        },
      },
    },
    select: { id: true, email: true },
  })

  const demoUser = await prisma.user.upsert({
    where: { email: demoEmail },
    update: {
      role: 'USER',
      isPremium: true,
    },
    create: {
      email: demoEmail,
      password: demoPasswordHash,
      role: 'USER',
      isPremium: true,
      profile: {
        create: {
          fullName: 'Ayesha Rahman',
          bio: 'Enjoys short trips, street food, and photographing city life.',
          currentLocation: 'Dhaka, Bangladesh',
          travelInterests: ['food', 'photography', 'history', 'nature'],
          visitedCountries: ['Bangladesh', 'India', 'Thailand'],
        },
      },
    },
    select: { id: true, email: true },
  })

    // Create sample travel plans
  const travelPlan1 = await prisma.travelPlan.create({
    data: {
     destination: 'Coxs Bazar, Bangladesh',
      startDate: new Date('2026-03-05'),
      endDate: new Date('2026-03-08'),
      budget: '$200-400',
      travelType: 'FRIENDS',
      description:
        'A short beach trip focused on relaxing, photos, and trying local seafood. Happy to join group activities.',
      userId: demoUser.id,
    },
  });

  const travelPlan2 = await prisma.travelPlan.create({
    data: {
    destination: 'Kuala Lumpur, Malaysia',
      startDate: new Date('2026-02-10'),
      endDate: new Date('2026-02-16'),
      budget: '$600-900',
      travelType: 'SOLO',
      description:
        'City exploration with day trips, local markets, and a few food spots. Open to meeting others for casual sightseeing.',
      userId: demoUser.id,
    },
  });

  

  console.log('Seed finished.')
  console.log(`Admin: ${adminEmail} / Admin@12345`)
  console.log(`Demo:  ${demoEmail} / Demo@12345`)
  console.log(`Admin id: ${admin.id}`)
  console.log(`Demo id:  ${demoUser.id}`)
}

seed()
  .catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
