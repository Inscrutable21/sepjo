import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function POST(request) {
  try {
    const { name, categoryId } = await request.json()

    const subCategory = await prisma.subCategory.create({
      data: { name, categoryId },
      include: { category: true }
    })

    return NextResponse.json({ subCategory })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create subcategory' },
      { status: 500 }
    )
  }
}