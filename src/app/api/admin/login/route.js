import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { verifyPassword, generateToken } from '../../../../lib/auth'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    
    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email },
    })
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Verify password
    const isValidPassword = await verifyPassword(password, admin.password)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Generate token
    const token = generateToken(admin.id)
    
    // Update last login
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    })
    
    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
      },
      token,
    })
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}