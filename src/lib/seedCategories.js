import { prisma } from './prisma'

const defaultCategories = [
  {
    name: 'Social Media',
    subCategories: [
      'Facebook Advertising',
      'Instagram Marketing',
      'Twitter Campaigns',
      'LinkedIn Ads',
      'YouTube Marketing',
      'TikTok Advertising'
    ]
  },
  {
    name: 'Billboard',
    subCategories: [
      'Highway Billboards',
      'City Center Displays',
      'Transit Advertising',
      'Airport Displays',
      'Mall Advertising',
      'Stadium Boards'
    ]
  },
  {
    name: 'Digital LED display ads',
    subCategories: [
      'Google Ads',
      'Display Advertising',
      'Video Advertising',
      'Mobile Advertising',
      'Programmatic Ads',
      'Native Advertising'
    ]
  }
]

export async function seedCategories() {
  try {
    console.log('🌱 Seeding default categories...')
    
    for (const categoryData of defaultCategories) {
      // Check if category already exists
      const existingCategory = await prisma.category.findFirst({
        where: { name: categoryData.name }
      })

      if (!existingCategory) {
        // Create category with subcategories
        const category = await prisma.category.create({
          data: {
            name: categoryData.name,
            subCategories: {
              create: categoryData.subCategories.map(subName => ({
                name: subName
              }))
            }
          },
          include: {
            subCategories: true
          }
        })
        
        console.log(`✅ Created category: ${category.name} with ${category.subCategories.length} subcategories`)
      } else {
        console.log(`⏭️  Category "${categoryData.name}" already exists`)
      }
    }
    
    console.log('🎉 Categories seeding completed!')
    return { success: true }
  } catch (error) {
    console.error('❌ Error seeding categories:', error)
    return { success: false, error }
  }
}