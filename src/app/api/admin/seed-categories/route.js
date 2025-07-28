import { NextResponse } from 'next/server'
import { seedCategories } from '../../../../lib/seedCategories'

export async function POST() {
  try {
    const result = await seedCategories()
    
    if (result.success) {
      return NextResponse.json({ 
        message: 'Default categories seeded successfully',
        success: true 
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to seed categories', details: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Seed categories error:', error)
    return NextResponse.json(
      { error: 'Failed to seed categories' },
      { status: 500 }
    )
  }
}