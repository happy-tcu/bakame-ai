
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

// Security event logging
export const logSecurityEvent = async (event: SecurityEvent): Promise<void> => {
  try {
    const { error } = await supabase
      .from('security_events')
      .insert({
        event_type: event.event_type,
        user_id: event.user_id,
        ip_address: event.ip_address,
        user_agent: event.user_agent || (typeof navigator !== 'undefined' ? navigator.userAgent : null),
        details: event.details,
        severity: event.severity || 'info'
      });

    if (error) {
      console.error('Security event logging error:', error);
    }
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
};

// Input sanitization and validation
export const sanitizeInput = (input: string, maxLength: number = 1000): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Basic international phone format
  return phoneRegex.test(phone.replace(/[\s-()]/g, ''));
};

// Get client IP (best effort, may not work behind proxies)
export const getClientIdentifier = (): string => {
  // In a real app, you'd get this from headers on the server side
  // For client-side, we use a combination of factors
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const timestamp = Date.now().toString();
  return btoa(userAgent + timestamp).slice(0, 32);
};
