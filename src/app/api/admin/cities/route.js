import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET() {
  try {
    const cities = await prisma.city.findMany({
      include: {
        _count: {
          select: { billboards: true }
        }
      },
      orderBy: { createdAt: 'desc' }
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

export async function POST(request) {
  try {
    const { name, state, country } = await request.json()

    // Check if city already exists
    const existingCity = await prisma.city.findFirst({
      where: {
        name: name,
        state: state,
        country: country || 'India'
      }
    })

    if (existingCity) {
      return NextResponse.json(
        { error: 'City already exists in this state' },
        { status: 400 }
      )
    }

    const city = await prisma.city.create({
      data: {
        name,
        state,
        country: country || 'India'
      }
    })

    return NextResponse.json({ city })
  } catch (error) {
    console.error('City creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create city' },
      { status: 500 }
    )
  }
}