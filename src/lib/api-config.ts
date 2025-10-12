// API Configuration
// In development, we need to explicitly use localhost:3001 for the backend
// In production, the backend and frontend are served from the same port

const isDevelopment = import.meta.env.DEV;
const isReplit = !!import.meta.env.VITE_REPLIT_DEV_DOMAIN || window.location.hostname.includes('replit');

// Get the API base URL based on environment
export const getApiBaseUrl = () => {
  // Check if we have a custom API URL in environment
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // In Replit environment, use the same origin - backend and frontend are served together
  if (isReplit) {
    // In Replit, both frontend and backend are served through the same proxy
    // So we use empty string to make calls to the same origin
    return '';
  }
  
  // In regular development, use the backend server port
  if (isDevelopment) {
    // Use localhost:3001 for backend API calls
    return 'http://localhost:3001';
  }
  
  // In production, use the same origin
  return '';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper to create full API URLs
export const createApiUrl = (path: string) => {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // If we have a base URL, prepend it
  if (API_BASE_URL) {
    return `${API_BASE_URL}${normalizedPath}`;
  }
  
  // Otherwise return the path as-is (for production same-origin)
  return normalizedPath;
};

// Export for debugging
if (isDevelopment) {
  console.log('[API Config] Base URL:', API_BASE_URL);
  console.log('[API Config] Is Development:', isDevelopment);
  console.log('[API Config] Is Replit:', isReplit);
}