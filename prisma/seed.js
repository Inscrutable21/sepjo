const { PrismaClient } = require('@prisma/client')

async function main() {
  let prisma;
  
  try {
    console.log('Starting seed process...')
    
    // Initialize Prisma client
    prisma = new PrismaClient()
    await prisma.$connect()
    console.log('✅ Connected to database')

    // Check if bcryptjs is available
    let bcrypt;
    try {
      bcrypt = require('bcryptjs')
      console.log('✅ bcryptjs loaded')
    } catch (error) {
      console.error('❌ bcryptjs not found. Installing...')
      console.error('Please run: npm install bcryptjs')
      process.exit(1)
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst()
    
    if (existingAdmin) {
      console.log('ℹ️  Admin already exists. Skipping seed.')
      console.log('Existing admin email:', existingAdmin.email)
      return
    }

    // Get credentials from environment
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@yourcompany.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    console.log('Creating admin with email:', adminEmail)

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 12)
    console.log('✅ Password hashed')
    
    // Create admin user
    const admin = await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
      },
    })

    console.log('✅ Admin user created successfully!')
    console.log('Admin ID:', admin.id)
    console.log('Email:', admin.email)
    console.log('You can now login with your credentials')
    
  } catch (error) {
    console.error('❌ Error during seed:', error.message)
    console.error('Full error:', error)
    throw error
  } finally {
    if (prisma) {
      await prisma.$disconnect()
      console.log('✅ Disconnected from database')
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })