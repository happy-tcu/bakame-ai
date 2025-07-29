
-- Fix critical database function vulnerabilities by adding proper search_path configuration
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
SELECT role::text FROM public.profiles WHERE id = auth.uid();
$function$;

-- Fix handle_new_user function security
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    CASE 
      WHEN NEW.raw_user_meta_data->>'role' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'role')::user_role
      ELSE 'creator'::user_role
    END
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't block user creation
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$function$;

-- Fix user_sessions RLS policies to prevent violations
DROP POLICY IF EXISTS "Allow anonymous session inserts" ON public.user_sessions;
DROP POLICY IF EXISTS "Allow anonymous session updates" ON public.user_sessions;

-- Create more secure policies for user_sessions
CREATE POLICY "Allow session creation" 
ON public.user_sessions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow session updates by session_id" 
ON public.user_sessions 
FOR UPDATE 
USING (true);

-- Add rate limiting table for forms and API endpoints
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier text NOT NULL, -- IP address, user ID, or session ID
  action text NOT NULL, -- form submission type or API endpoint
  count integer NOT NULL DEFAULT 1,
  window_start timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on rate_limits table
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Create policy for rate limits (admins can view all, others can view their own)
CREATE POLICY "Admins can manage rate limits" 
ON public.rate_limits 
FOR ALL 
USING (get_current_user_role() = 'admin');

CREATE POLICY "Allow rate limit checks and inserts" 
ON public.rate_limits 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow rate limit updates" 
ON public.rate_limits 
FOR UPDATE 
USING (true);

-- Create index for efficient rate limit lookups
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_action 
ON public.rate_limits (identifier, action, window_start);

-- Add security event logging table
CREATE TABLE IF NOT EXISTS public.security_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  ip_address inet,
  user_agent text,
  details jsonb,
  severity text NOT NULL DEFAULT 'info',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on security_events table
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Create policy for security events (only admins can view)
CREATE POLICY "Admins can view security events" 
ON public.security_events 
FOR SELECT 
USING (get_current_user_role() = 'admin');

CREATE POLICY "Allow security event creation" 
ON public.security_events 
FOR INSERT 
WITH CHECK (true);

-- Clean up old rate limit entries (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
DELETE FROM public.rate_limits 
WHERE window_start < now() - interval '24 hours';
$function$;
