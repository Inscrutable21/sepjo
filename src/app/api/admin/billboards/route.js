import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET() {
  try {
    const billboards = await prisma.billboard.findMany({
      include: {
        city: true,
        category: true,
        subCategory: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ billboards })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch billboards' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    
    const billboard = await prisma.billboard.create({
      data: {
        title: data.title,
        cityId: data.cityId,
        categoryId: data.categoryId,
        subCategoryId: data.subCategoryId || null,
        mediaType: data.mediaType,
        size: data.size,
        illumination: data.illumination,
        ftf: data.ftf,
        totalArea: parseFloat(data.totalArea),
        description: data.description,
        pricing: parseFloat(data.pricing),
        offerPricing: data.offerPricing ? parseFloat(data.offerPricing) : null,
        discountPercent: data.discountPercent ? parseFloat(data.discountPercent) : null,
        images: data.images || [],
        location: data.location,
        isActive: data.isActive ?? true,
        isAvailable: data.isAvailable ?? true
      },
      include: {
        city: true,
        category: true,
        subCategory: true
      }
    })

    return NextResponse.json({ billboard })
  } catch (error) {
    console.error('Billboard creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create billboard' },
      { status: 500 }
    )
  }
}