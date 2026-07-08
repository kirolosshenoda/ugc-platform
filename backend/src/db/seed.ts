import pool from './connection.js'
import bcrypt from 'bcryptjs'

const seedDatabase = async () => {
  try {
    console.log('Starting database seed...')

    // Create sample users
    const passwordHash = await bcrypt.hash('password123', 10)

    // Brand user
    await pool.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, role, is_verified) 
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT DO NOTHING`,
      ['brand@example.com', passwordHash, 'Glow', 'Beauty', 'brand', true]
    )

    // Creator users
    const creators = [
      { email: 'sarah@example.com', first_name: 'Sarah', last_name: 'Ahmed' },
      { email: 'maya@example.com', first_name: 'Maya', last_name: 'Khan' },
      { email: 'leila@example.com', first_name: 'Leila', last_name: 'Hassan' },
    ]

    for (const creator of creators) {
      await pool.query(
        `INSERT INTO users (email, password_hash, first_name, last_name, role, is_verified) 
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT DO NOTHING`,
        [creator.email, passwordHash, creator.first_name, creator.last_name, 'creator', true]
      )
    }

    console.log('Database seed completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
