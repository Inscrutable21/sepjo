import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  try {
    const cities = await prisma.city.findMany({
      include: {
        _count: {
          select: { billboards: true }
        }
      },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json({ cities })
  } catch (error) {
    console.error('Cities fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cities' },
      { status: 500 }
    )
  }
}