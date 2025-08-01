import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subCategories: true,
        _count: {
          select: { billboards: true }
        }
      },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Categories fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}