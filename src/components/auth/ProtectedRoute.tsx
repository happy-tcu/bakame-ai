import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { hasAnyRole } from '@/utils/roleUtils';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  fallbackPath?: string;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles = [],
  fallbackPath = '/'
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If not loading and user is not authenticated, redirect to login
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }
  }, [loading, user, navigate]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // User is not authenticated
  if (!user) {
    return null; // Will redirect via useEffect
  }

  // If allowedRoles is specified, check if user has the required role
  if (allowedRoles.length > 0) {
    const hasAccess = hasAnyRole(user, allowedRoles);
    
    if (!hasAccess) {
      return (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-md w-full">
            <Alert variant="destructive">
              <AlertTitle>Access Denied</AlertTitle>
              <AlertDescription>
                You don't have permission to access this page. Please contact your administrator if you believe this is an error.
              </AlertDescription>
            </Alert>
            <button
              onClick={() => navigate(fallbackPath)}
              className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              data-testid="button-go-back"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  // User is authenticated and has the required role (if specified)
  return <>{children}</>;
};