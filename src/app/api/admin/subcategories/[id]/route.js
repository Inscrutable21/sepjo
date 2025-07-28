import { NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

export async function PUT(request, { params }) {
  try {
    const { name, categoryId } = await request.json()
    const { id } = params

    const subCategory = await prisma.subCategory.update({
      where: { id },
      data: { name, categoryId },
      include: { category: true }
    })

    return NextResponse.json({ subCategory })
  } catch (error) {
    console.error('Subcategory update error:', error)
    return NextResponse.json(
      { error: 'Failed to update subcategory' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params

    // Check if subcategory has billboards
    const billboardCount = await prisma.billboard.count({
      where: { subCategoryId: id }
    })

    if (billboardCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete subcategory. It has ${billboardCount} associated billboards.` },
        { status: 400 }
      )
    }

    await prisma.subCategory.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Subcategory deleted successfully' })
  } catch (error) {
    console.error('Subcategory delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete subcategory' },
      { status: 500 }
    )
  }
}