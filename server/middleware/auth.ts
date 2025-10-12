import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { storage } from '../storage';
import { getUserRole } from '../utils/roleAssignment';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Use VITE_ prefixed variables from .env file
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

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
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Get or create user in our database
    let dbUser = await storage.getUserByEmail(user.email!);
    if (!dbUser) {
      // Intelligently determine the user's role
      const role = getUserRole(
        user.email!,
        user.user_metadata || {},
        user.user_metadata?.name
      );
      
      dbUser = await storage.createUser({
        email: user.email!,
        name: user.user_metadata?.name || null,
        role: role
      });
    }

    req.user = dbUser;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}