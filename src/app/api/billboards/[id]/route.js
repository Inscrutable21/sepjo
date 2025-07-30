import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request, { params }) {
  try {
    const billboard = await prisma.billboard.findUnique({
      where: {
        id: params.id,
        isActive: true
      },
      include: {
        city: true,
        category: true,
        subCategory: true
      }
    })

    if (!billboard) {
      return NextResponse.json(
        { error: 'Billboard not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ billboard })
  } catch (error) {
    console.error('Billboard fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch billboard' },
      { status: 500 }
    )
  }
}