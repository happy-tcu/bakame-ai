import dotenv from 'dotenv';
import postgres from 'postgres';

dotenv.config();

async function testDatabaseConnection() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL is not set');
    process.exit(1);
  }

  console.log('🔍 Testing database connection...');
  console.log('📍 Connection string format check:');
  
  // Parse connection string to show details (without password)
  try {
    const url = new URL(connectionString);
    console.log(`   Protocol: ${url.protocol}`);
    console.log(`   Host: ${url.hostname}`);
    console.log(`   Port: ${url.port || 'default'}`);
    console.log(`   Database: ${url.pathname.substring(1)}`);
    console.log(`   User: ${url.username}`);
  } catch (e) {
    console.error('❌ Invalid connection string format');
    console.error('   Expected format: postgresql://user:password@host:port/database');
    process.exit(1);
  }

  try {
    const client = postgres(connectionString, {
      max: 1,
      connect_timeout: 10
    });
    
    console.log('\n🔌 Attempting to connect...');
    const result = await client`SELECT NOW() as current_time, version() as postgres_version`;
    
    console.log('✅ Database connection successful!');
    console.log(`   Current time: ${result[0].current_time}`);
    console.log(`   PostgreSQL version: ${result[0].postgres_version.split(',')[0]}`);
    
    await client.end();
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Database connection failed:');
    console.error(`   Error: ${error.message}`);
    
    if (error.code === 'ENOTFOUND') {
      console.error('\n💡 Troubleshooting:');
      console.error('   1. Check that your Supabase project is not paused');
      console.error('   2. Verify the hostname in your DATABASE_URL is correct');
      console.error('   3. Make sure you copied the full connection string from Supabase');
      console.error('      (Project Settings → Database → Connection string → URI)');
    }
    
    process.exit(1);
  }
}

testDatabaseConnection();
