import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Supabase configuration
const SUPABASE_URL = "https://wzjorefhpnkjsjciyozh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6am9yZWZocG5ranNqY2l5b3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMTE2NjAsImV4cCI6MjA2Njg4NzY2MH0.g3UucvMiCjcV97w-RqtjtkyYg9j2jtoXX0HJHDhs2yY";

// Test credentials
const TEST_EMAIL = 'testuser@testmail.com';
const TEST_PASSWORD = 'Test123!';

async function testLogin() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  console.log('Testing login with test credentials...\n');
  
  // Try to sign in directly
  const { data, error } = await supabase.auth.signInWithPassword({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  });
  
  if (error) {
    console.error('❌ Login failed:', error.message);
    if (error.message.includes('Email not confirmed')) {
      console.log('\n⚠️  Email verification is required by Supabase.');
      console.log('\nTo bypass this for testing:');
      console.log('1. You can use a temporary email service like https://temp-mail.org/');
      console.log('2. Or disable email confirmation in Supabase Dashboard:');
      console.log('   - Go to your Supabase project dashboard');
      console.log('   - Navigate to Authentication > Providers > Email');
      console.log('   - Disable "Confirm email" option');
      console.log('\nFor now, let me create a different approach...');
    }
  } else {
    console.log('✅ Login successful!');
    console.log('User:', data.user?.email);
    console.log('Session established:', !!data.session);
    console.log('\nYou can now login with these credentials:');
    console.log('Email:', TEST_EMAIL);
    console.log('Password:', TEST_PASSWORD);
  }
  
  process.exit(0);
}

testLogin().catch(console.error);