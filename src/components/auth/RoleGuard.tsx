import { useAuth } from './AuthContext';
import { hasAnyRole } from '@/utils/roleUtils';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallback?: React.ReactNode;
  hideWhenUnauthorized?: boolean;
}

export const RoleGuard = ({ 
  children, 
  allowedRoles,
  fallback = null,
  hideWhenUnauthorized = true
}: RoleGuardProps) => {
  const { user, loading } = useAuth();

  // Don't render anything while loading
  if (loading) {
    return null;
  }

  // Check if user is authenticated
  if (!user) {
    return hideWhenUnauthorized ? null : <>{fallback}</>;
  }

  // Check if user has the required role
  const hasAccess = hasAnyRole(user, allowedRoles);

  if (!hasAccess) {
    return hideWhenUnauthorized ? null : <>{fallback}</>;
  }

  // User has access, render children
  return <>{children}</>;
};

interface RoleBasedContentProps {
  roles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Convenience component for showing/hiding content based on roles
 */
export const RoleBasedContent = ({ 
  roles, 
  children, 
  fallback = null 
}: RoleBasedContentProps) => {
  return (
    <RoleGuard 
      allowedRoles={roles} 
      fallback={fallback}
      hideWhenUnauthorized={!fallback}
    >
      {children}
    </RoleGuard>
  );
};

/**
 * Hook to check if current user has a specific role
 */
export const useHasRole = (allowedRoles: string[]): boolean => {
  const { user } = useAuth();
  return hasAnyRole(user, allowedRoles);
};