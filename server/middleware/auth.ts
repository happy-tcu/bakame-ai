import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { storage } from '../storage';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Use VITE_ prefixed variables from .env file
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Bypass authentication constants (DEVELOPMENT ONLY)
const BYPASS_TOKEN = 'bypass-admin-token';
const BYPASS_EMAIL = 'niyorurema1@gmail.com';

// Check if required environment variables are present
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required Supabase environment variables');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Not set');
  console.error('VITE_SUPABASE_PUBLISHABLE_KEY:', supabaseKey ? 'Set' : 'Not set');
  throw new Error('supabaseUrl and supabaseKey are required');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export interface AuthRequest extends Request {
  user?: any;
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    
    // DEVELOPMENT ONLY: Check for bypass token
    if (token === BYPASS_TOKEN) {
      console.warn('⚠️  WARNING: Using bypass authentication (development only)');
      
      // Get or create bypass admin user
      let dbUser = await storage.getUserByEmail(BYPASS_EMAIL);
      if (!dbUser) {
        dbUser = await storage.createUser({
          email: BYPASS_EMAIL,
          name: 'Admin',
          role: 'admin'
        });
      }
      
      req.user = dbUser;
      next();
      return;
    }

    // Normal Supabase authentication
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Get or create user in our database
    let dbUser = await storage.getUserByEmail(user.email!);
    if (!dbUser) {
      dbUser = await storage.createUser({
        email: user.email!,
        name: user.user_metadata?.name || null,
        role: 'student'
      });
    }

    req.user = dbUser;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}
