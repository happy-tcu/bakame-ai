
import { supabase } from '@/integrations/supabase/client';

export interface RateLimitOptions {
  identifier: string;
  action: string;
  maxRequests: number;
  windowMinutes: number;
}

export interface SecurityEvent {
  event_type: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  details?: Record<string, any>;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

// Rate limiting function
export const checkRateLimit = async (options: RateLimitOptions): Promise<{ allowed: boolean; remaining: number }> => {
  const { identifier, action, maxRequests, windowMinutes } = options;
  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000);

  try {
    // Check current count within window
    const { data: existingLimits, error: selectError } = await supabase
      .from('rate_limits')
      .select('count, window_start')
      .eq('identifier', identifier)
      .eq('action', action)
      .gte('window_start', windowStart.toISOString())
      .order('window_start', { ascending: false })
      .limit(1);

    if (selectError) {
      console.error('Rate limit check error:', selectError);
      // Allow request if we can't check (fail open for availability)
      return { allowed: true, remaining: maxRequests - 1 };
    }

    const currentCount = existingLimits?.[0]?.count || 0;

    if (currentCount >= maxRequests) {
      // Rate limit exceeded
      await logSecurityEvent({
        event_type: 'rate_limit_exceeded',
        details: { identifier, action, count: currentCount, limit: maxRequests },
        severity: 'medium'
      });
      
      return { allowed: false, remaining: 0 };
    }

    // Update or insert rate limit record
    if (existingLimits && existingLimits.length > 0) {
      // Update existing record
      const { error: updateError } = await supabase
        .from('rate_limits')
        .update({ count: currentCount + 1 })
        .eq('identifier', identifier)
        .eq('action', action)
        .gte('window_start', windowStart.toISOString());

      if (updateError) {
        console.error('Rate limit update error:', updateError);
      }
    } else {
      // Insert new record
      const { error: insertError } = await supabase
        .from('rate_limits')
        .insert({
          identifier,
          action,
          count: 1,
          window_start: new Date().toISOString()
        });

      if (insertError) {
        console.error('Rate limit insert error:', insertError);
      }
    }

    return { allowed: true, remaining: maxRequests - currentCount - 1 };
  } catch (error) {
    console.error('Rate limiting error:', error);
    // Fail open to maintain availability
    return { allowed: true, remaining: maxRequests - 1 };
  }
};

// Security event logging via secure edge function
export const logSecurityEvent = async (event: SecurityEvent): Promise<void> => {
  try {
    const { error } = await supabase.functions.invoke('log-security-event', {
      body: {
        event_type: event.event_type,
        severity: event.severity || 'info',
        details: event.details || {}
      }
    });

    if (error) {
      console.error('Security event logging error:', error);
    }
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
};

// Enhanced input sanitization and validation with comprehensive XSS protection
export const sanitizeInput = (input: string, maxLength: number = 1000): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .slice(0, maxLength)
    // Remove script tags and content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove iframe, object, embed tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    // Remove javascript: and data: protocols
    .replace(/javascript:/gi, '')
    .replace(/data:\s*text\/html/gi, '')
    // Remove vbscript: protocol
    .replace(/vbscript:/gi, '')
    // Remove dangerous HTML entities
    .replace(/&lt;script/gi, '')
    .replace(/&lt;\/script/gi, '')
    // Remove potential HTML tags but allow some safe formatting
    .replace(/<(?!\/?(b|i|em|strong|p|br)\b)[^>]*>/gi, '');
};

// Enhanced HTML sanitization for rich content
export const sanitizeHtml = (html: string): string => {
  if (!html || typeof html !== 'string') return '';

  // Allow only safe HTML tags and attributes
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li'];
  const allowedAttributes = ['class'];

  let sanitized = html;

  // Remove all tags except allowed ones
  sanitized = sanitized.replace(/<\/?([a-zA-Z0-9]+)[^>]*>/g, (match, tag) => {
    if (allowedTags.includes(tag.toLowerCase())) {
      return match;
    }
    return '';
  });

  // Sanitize attributes (remove all except allowed ones)
  sanitized = sanitized.replace(/(\w+)=["']([^"']*)["']/g, (match, attr, value) => {
    if (allowedAttributes.includes(attr.toLowerCase())) {
      return match;
    }
    return '';
  });

  return sanitized;
};

// Enhanced email validation with comprehensive checks
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  
  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Check basic format
  if (!emailRegex.test(email)) return false;
  
  // Check length limits (RFC 5321)
  if (email.length > 254) return false;
  
  // Check for dangerous patterns
  if (email.includes('<') || email.includes('>') || email.includes('"') || email.includes('\\')) {
    return false;
  }
  
  return true;
};

// Enhanced phone validation
export const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Phone is optional
  
  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if it's a reasonable length (7-15 digits)
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
};

// Input length validation helper
export const validateInputLength = (input: string, maxLength: number, fieldName: string): boolean => {
  if (!input) return true; // Empty is okay unless required
  
  if (input.length > maxLength) {
    console.warn(`${fieldName} exceeds maximum length of ${maxLength} characters`);
    return false;
  }
  
  return true;
};

// Enhanced client identifier with better entropy
export const getClientIdentifier = (): string => {
  // Use multiple factors for better identification
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const language = typeof navigator !== 'undefined' ? navigator.language : '';
  const platform = typeof navigator !== 'undefined' ? navigator.platform : '';
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36);
  
  const combined = userAgent + language + platform + timestamp + random;
  return btoa(combined).slice(0, 32);
};

// Authentication state cleanup utility for preventing limbo states
export const cleanupAuthState = () => {
  try {
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.removeItem('supabase.auth.token');
    
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Failed to cleanup auth state:', error);
  }
};

// Content Security Policy headers helper
export const getSecurityHeaders = () => ({
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://wzjorefhpnkjsjciyozh.supabase.co;",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
});
