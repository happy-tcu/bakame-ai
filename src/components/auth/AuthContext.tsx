import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// DEVELOPMENT ONLY: Hardcoded admin credentials for bypass
const BYPASS_EMAIL = 'niyorurema1@gmail.com';
const BYPASS_PASSWORD = 'Bakame@AI123';
const BYPASS_TOKEN = 'bypass-admin-token';

// Create a fake user object for bypass
const createFakeUser = (email: string): User => {
  console.warn('⚠️  WARNING: Using bypass authentication (development only)');
  return {
    id: 'bypass-admin-id',
    email: email,
    app_metadata: {},
    user_metadata: {
      name: 'Admin',
      role: 'admin'
    },
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  } as User;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for bypass session first
    const bypassSession = localStorage.getItem('bypass_session');
    if (bypassSession) {
      const fakeUser = createFakeUser(BYPASS_EMAIL);
      setUser(fakeUser);
      setLoading(false);
      return;
    }

    // Get initial session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    // Check for bypass credentials
    if (email === BYPASS_EMAIL && password === BYPASS_PASSWORD) {
      const fakeUser = createFakeUser(email);
      setUser(fakeUser);
      localStorage.setItem('bypass_session', 'true');
      
      toast({
        title: 'Welcome back, Admin!',
        description: 'You have successfully signed in.',
      });
      return;
    }

    // Normal Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      toast({
        title: 'Sign in failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
    
    toast({
      title: 'Welcome back!',
      description: 'You have successfully signed in.',
    });
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    
    if (error) {
      toast({
        title: 'Sign up failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
    
    // Initialize user progress after successful signup
    if (data.user && data.session) {
      try {
        // Create initial user record in our backend
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.session.access_token}`
          },
          body: JSON.stringify({
            email: email,
            name: name
          })
        });
        
        if (!response.ok) {
          console.error('Failed to initialize user progress');
        }
      } catch (error) {
        console.error('Error initializing user progress:', error);
      }
    }
    
    toast({
      title: 'Account created!',
      description: 'Please check your email to verify your account.',
    });
  };

  const signOut = async () => {
    // Check if using bypass session
    const bypassSession = localStorage.getItem('bypass_session');
    if (bypassSession) {
      localStorage.removeItem('bypass_session');
      setUser(null);
      setSession(null);
      
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
      return;
    }

    // Normal Supabase sign out
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: 'Sign out failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
    
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out.',
    });
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      toast({
        title: 'Password reset failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
    
    toast({
      title: 'Check your email',
      description: 'We sent you a password reset link.',
    });
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
