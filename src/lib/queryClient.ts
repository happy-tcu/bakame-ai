import { QueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string;
        
        // Get the auth token from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        
        if (session?.access_token) {
          headers['Authorization'] = `Bearer ${session.access_token}`;
        }
        
        const response = await fetch(url, { headers });
        
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
  const { data: { session } } = await supabase.auth.getSession();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `Request failed with status ${response.status}`);
  }
  
  return response.json();
};