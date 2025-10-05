import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { users } from '../shared/schema';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Supabase configuration from the client
const SUPABASE_URL = "https://wzjorefhpnkjsjciyozh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6am9yZWZocG5ranNqY2l5b3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMTE2NjAsImV4cCI6MjA2Njg4NzY2MH0.g3UucvMiCjcV97w-RqtjtkyYg9j2jtoXX0HJHDhs2yY";

// Test user credentials
const TEST_USER = {
  email: 'testuser@testmail.com',
  password: 'Test123!',
  name: 'Test User'
};

async function createTestUser() {
  console.log('Creating test user...');
  
  // Initialize Supabase client
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  // First, try to sign up the user in Supabase Auth
  console.log('Attempting to create user in Supabase Auth...');
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: TEST_USER.email,
    password: TEST_USER.password,
    options: {
      data: {
        name: TEST_USER.name,
      },
      emailRedirectTo: 'http://localhost:5000' // Redirect to local app
    }
  });

  if (signUpError) {
    // If user already exists, try to sign in
    if (signUpError.message.includes('already registered')) {
      console.log('User already exists in Supabase Auth');
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: TEST_USER.email,
        password: TEST_USER.password,
      });
      
      if (signInError) {
        console.error('Error signing in:', signInError);
        return;
      }
      console.log('Successfully signed in existing user');
    } else {
      console.error('Error creating user in Supabase Auth:', signUpError);
      return;
    }
  } else {
    console.log('User created in Supabase Auth (email verification may be required)');
  }

  // Now ensure the user exists in our PostgreSQL database
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL not found in environment');
    return;
  }

  const sql = postgres(databaseUrl);
  const db = drizzle(sql);

  try {
    // Check if user already exists in database
    const existingUsers = await db.select().from(users).where(eq(users.email, TEST_USER.email));
    
    if (existingUsers.length > 0) {
      console.log('User already exists in database');
      console.log('\n✅ Test user is ready!');
    } else {
      // Create user in database
      const [newUser] = await db.insert(users).values({
        email: TEST_USER.email,
        name: TEST_USER.name,
        role: 'student'
      }).returning();
      
      console.log('User created in database:', newUser);
      console.log('\n✅ Test user created successfully!');
    }
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await sql.end();
  }

  console.log('\n📧 Test Credentials:');
  console.log('Email:', TEST_USER.email);
  console.log('Password:', TEST_USER.password);
  console.log('\nNote: If this is the first time creating this user, Supabase may require email verification.');
  console.log('For testing purposes, you can disable email verification in your Supabase project settings.');
}

// Run the script
createTestUser().catch(console.error);