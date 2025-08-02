import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const cityId = searchParams.get('cityId')

    if (!cityId) {
      return NextResponse.json(
        { error: 'City ID is required' },
        { status: 400 }
      )
    }

    // Get all billboards in the specified city and filter locations on the server
    const billboards = await prisma.billboard.findMany({
      where: {
        cityId: cityId,
        isActive: true
      },
      select: {
        location: true
      }
    })

    // Filter out null/empty locations and get unique ones
    const uniqueLocations = [...new Set(
      billboards
        .map(billboard => billboard.location)
        .filter(location => location && location.trim() !== '')
    )]

    // Transform to the expected format
    const locations = uniqueLocations.map((location, index) => ({
      id: `${cityId}-${index}`,
      name: location
    }))

    return NextResponse.json({ locations })
  } catch (error) {
    console.error('Locations fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    )
  }
}





