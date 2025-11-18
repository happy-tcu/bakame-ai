import { User } from '@supabase/supabase-js';

/**
 * Get the user's role from the user object
 * Checks both user.role and user.user_metadata.role as fallbacks
 */
export const getUserRole = (user: User | null): string | null => {
  if (!user) return null;
  
  // Check user_metadata.role first (from Supabase auth)
  if (user.user_metadata?.role) {
    return user.user_metadata.role as string;
  }
  
  // Check direct role property (might be added by custom logic)
  if ((user as any).role) {
    return (user as any).role;
  }
  
  // Check app_metadata.role (another possible location)
  if (user.app_metadata?.role) {
    return user.app_metadata.role as string;
  }
  
  return null;
};

/**
 * Check if a user has a specific role
 */
export const hasRole = (user: User | null, role: string): boolean => {
  const userRole = getUserRole(user);
  return userRole === role;
};

/**
 * Check if a user has any of the allowed roles
 */
export const hasAnyRole = (user: User | null, allowedRoles: string[]): boolean => {
  const userRole = getUserRole(user);
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
};

/**
 * Check if a user has all of the required roles (for multi-role systems)
 */
export const hasAllRoles = (user: User | null, requiredRoles: string[]): boolean => {
  const userRole = getUserRole(user);
  if (!userRole) return false;
  
  // For single role systems, check if user has the role
  // For multi-role systems, this can be extended
  return requiredRoles.length === 1 && requiredRoles[0] === userRole;
};

/**
 * Common role constants
 */
export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  ENTERPRISE: 'enterprise',
  GOVERNMENT: 'government',
  USER: 'user',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];