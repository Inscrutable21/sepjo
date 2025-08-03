import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  try {
    const billboards = await prisma.billboard.findMany({
      where: {
        isActive: true
        // Remove isAvailable: true filter to get all billboards
      },
      include: {
        city: true,
        category: true,
        subCategory: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ billboards })
  } catch (error) {
    console.error('Billboards fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch billboards' },
      { status: 500 }
    )
  }
}
