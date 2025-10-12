import { QueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { createApiUrl } from './api-config';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey, signal }) => {
        const path = queryKey[0] as string;
        
        // Create full URL with backend base URL
        const url = createApiUrl(path);
        
        // Get the auth token from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        
        if (session?.access_token) {
          headers['Authorization'] = `Bearer ${session.access_token}`;
        }
        
        console.log(`[API] Fetching: ${url}`);
        
        // Create timeout controller
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        try {
          const response = await fetch(url, { 
            headers,
            credentials: 'include', // Include cookies for cross-origin requests
            signal: signal || controller.signal // Use provided signal or our timeout controller
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Request failed' }));
            console.error(`[API] Error fetching ${url}:`, error);
            throw new Error(error.error || `Request failed with status ${response.status}`);
          }
          
          const data = await response.json();
          console.log(`[API] Success fetching ${url}`);
          return data;
        } catch (error) {
          clearTimeout(timeoutId);
          if (error instanceof Error && error.name === 'AbortError') {
            throw new Error(`Request timeout after 10 seconds: ${url}`);
          }
          throw error;
        }
      },
      // Add retry and error handling configuration
      retry: (failureCount, error) => {
        // Don't retry on 401 (unauthorized) or 404 (not found)
        if (error instanceof Error) {
          if (error.message.includes('401') || error.message.includes('404')) {
            return false;
          }
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

export const apiRequest = async (
  path: string, 
  options: RequestInit = {}
) => {
  // Create full URL with backend base URL
  const url = createApiUrl(path);
  
  const { data: { session } } = await supabase.auth.getSession();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }
  
  console.log(`[API] Request to: ${url}`);
  
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Include cookies for cross-origin requests
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    console.error(`[API] Error from ${url}:`, error);
    throw new Error(error.error || `Request failed with status ${response.status}`);
  }
  
  const data = await response.json();
  console.log(`[API] Success from ${url}`);
  return data;
};