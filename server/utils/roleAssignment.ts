/**
 * Intelligent role assignment based on user information
 * Determines the appropriate role for a user based on their email and name
 */

/**
 * Determines the user role based on email patterns and name keywords
 * @param email User's email address
 * @param name Optional user's name  
 * @returns The determined role string
 */
export function determineUserRole(email: string, name?: string): string {
  // Normalize email to lowercase for case-insensitive matching
  const lowerEmail = email.toLowerCase();
  const lowerName = name?.toLowerCase() || '';

  // Check for admin roles - highest priority
  if (lowerEmail.endsWith('@bakame.org') || lowerEmail.endsWith('@admin.bakame.org')) {
    return 'admin';
  }

  // Check for government roles
  if (lowerEmail.endsWith('.gov')) {
    return 'government';
  }

  // Check for teacher/educator roles
  if (
    lowerEmail.includes('teacher') ||
    lowerEmail.includes('prof') ||
    lowerEmail.includes('educator') ||
    lowerEmail.endsWith('.edu') ||
    lowerName.includes('teacher') ||
    lowerName.includes('professor') ||
    lowerName.includes('educator')
  ) {
    return 'teacher';
  }

  // Check for school roles
  if (
    lowerEmail.includes('school') ||
    lowerEmail.endsWith('.edu') ||
    lowerEmail.endsWith('.ac.') || // Academic domains
    lowerName.includes('school')
  ) {
    return 'school';
  }

  // Check for manager roles
  if (
    lowerEmail.includes('manager') ||
    lowerEmail.includes('coordinator') ||
    lowerName.includes('manager') ||
    lowerName.includes('coordinator')
  ) {
    return 'manager';
  }

  // Check for creator/content roles
  if (
    lowerEmail.includes('creator') ||
    lowerEmail.includes('content') ||
    lowerName.includes('creator') ||
    lowerName.includes('content')
  ) {
    return 'creator';
  }

  // Check for NGO roles - should be checked after specific org domains like bakame.org
  if (lowerEmail.endsWith('.org')) {
    return 'ngo';
  }

  // Default to student role
  return 'student';
}

/**
 * Validates if a role is valid
 * @param role The role to validate
 * @returns boolean indicating if the role is valid
 */
export function isValidRole(role: string): boolean {
  const validRoles = [
    'admin',
    'teacher',
    'student',
    'school',
    'government',
    'ngo',
    'manager',
    'creator'
  ];
  return validRoles.includes(role);
}

/**
 * Gets the role from user metadata or determines it intelligently
 * @param email User's email
 * @param metadata User metadata from auth provider
 * @param name User's name
 * @returns The final determined role
 */
export function getUserRole(
  email: string, 
  metadata: Record<string, any> = {}, 
  name?: string
): string {
  // First check if metadata contains a valid role
  if (metadata.role && isValidRole(metadata.role)) {
    return metadata.role;
  }

  // Otherwise determine role intelligently
  return determineUserRole(email, name || metadata.name);
}