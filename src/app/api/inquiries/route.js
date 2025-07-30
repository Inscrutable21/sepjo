import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(request) {
  try {
    const data = await request.json()
    
    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        startDate: data.startDate ? new Date(data.startDate) : null,
        duration: data.duration ? parseInt(data.duration) : null,
        billboardId: data.billboardId,
        billboardTitle: data.billboardTitle,
        status: 'PENDING'
      }
    })

    return NextResponse.json({ inquiry })
  } catch (error) {
    console.error('Inquiry creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create inquiry' },
      { status: 500 }
    )
  }
}