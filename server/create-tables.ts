import dotenv from 'dotenv';
import postgres from 'postgres';

dotenv.config();

async function createTables() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL is not set');
    process.exit(1);
  }

  console.log('🔨 Creating database tables...');

  const sql = postgres(connectionString);

  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255),
        role VARCHAR(50) DEFAULT 'student',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ Created users table');

    // Create conversations table
    await sql`
      CREATE TABLE IF NOT EXISTS conversations (
        id SERIAL PRIMARY KEY,
        conversation_id VARCHAR(255) NOT NULL UNIQUE,
        agent_id VARCHAR(255) NOT NULL,
        user_id VARCHAR(255),
        status VARCHAR(50),
        start_time TIMESTAMP,
        call_duration_seconds INTEGER,
        cost DECIMAL(10, 6),
        transcript JSONB,
        analysis JSONB,
        metadata JSONB,
        conversation_initiation_data JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ Created conversations table');

    console.log('🎉 Database tables created successfully!');
    
    await sql.end();
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error creating tables:', error.message);
    await sql.end();
    process.exit(1);
  }
}

createTables();
