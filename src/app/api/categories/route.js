import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  try {
    // Add connection check
    await prisma.$connect()
    
    const categories = await prisma.category.findMany({
      include: {
        subCategories: true,
        _count: {
          select: { 
            billboards: {
              where: {
                isActive: true,
                isAvailable: true
              }
            }
          }
        }
      },
      orderBy: { name: 'asc' }
    })

    const categoriesWithComingSoon = categories.map(category => ({
      ...category,
      comingSoon: category.comingSoon || category._count.billboards === 0
    }))

    return NextResponse.json({ categories: categoriesWithComingSoon })
  } catch (error) {
    console.error('Categories fetch error:', error)
    
    // Try to reconnect
    try {
      await prisma.$disconnect()
      await prisma.$connect()
    } catch (reconnectError) {
      console.error('Reconnection failed:', reconnectError)
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

