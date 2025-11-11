import { QueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// DEVELOPMENT ONLY: Bypass token for admin
const BYPASS_TOKEN = 'bypass-admin-token';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string;
        
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        
        // Check for bypass session first
        const bypassSession = localStorage.getItem('bypass_session');
        if (bypassSession) {
          headers['Authorization'] = `Bearer ${BYPASS_TOKEN}`;
        } else {
          // Get the auth token from Supabase
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.access_token) {
            headers['Authorization'] = `Bearer ${session.access_token}`;
          }
        }
        
        const response = await fetch(url, { headers, credentials: 'include' });
        
        if (!response.ok) {
          const error = await response.json().catch(() => ({ error: 'Request failed' }));
          throw new Error(error.error || `Request failed with status ${response.status}`);
        }
        
        return response.json();
      },
    },
  },
});

export const apiRequest = async (
  url: string, 
  options: RequestInit = {}
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  
  // Check for bypass session first
  const bypassSession = localStorage.getItem('bypass_session');
  if (bypassSession) {
    headers['Authorization'] = `Bearer ${BYPASS_TOKEN}`;
  } else {
    // Get the auth token from Supabase
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `Request failed with status ${response.status}`);
  }
  
  return response.json();
};
