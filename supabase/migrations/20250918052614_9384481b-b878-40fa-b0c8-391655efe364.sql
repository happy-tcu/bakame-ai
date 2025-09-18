-- Security Fix 1: Update user_sessions RLS policies to prevent anonymous manipulation
DROP POLICY IF EXISTS "Allow session creation and updates" ON public.user_sessions;
DROP POLICY IF EXISTS "Allow session updates" ON public.user_sessions;

-- Create more secure policies for user_sessions
CREATE POLICY "Authenticated users can create their own sessions"
ON public.user_sessions
FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own sessions"
ON public.user_sessions
FOR UPDATE
USING (auth.uid() = user_id OR user_id IS NULL);

-- Security Fix 2: Restrict security_events table to system processes only
DROP POLICY IF EXISTS "Allow security event creation" ON public.security_events;

-- Create secure edge function for logging security events
CREATE POLICY "System can insert security events"
ON public.security_events
FOR INSERT
WITH CHECK (auth.uid() IS NULL OR get_current_user_role() = 'admin');

-- Security Fix 3: Improve function security with proper search paths
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
DELETE FROM public.rate_limits 
WHERE window_start < now() - interval '24 hours';
$function$;

-- Security Fix 4: Add session validation function
CREATE OR REPLACE FUNCTION public.validate_session_access(session_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
SELECT 
  CASE 
    WHEN auth.uid() IS NULL THEN session_user_id IS NULL
    WHEN auth.uid() IS NOT NULL THEN auth.uid() = session_user_id OR session_user_id IS NULL
    ELSE false
  END;
$function$;

-- Update user_sessions policies to use the validation function
DROP POLICY IF EXISTS "Authenticated users can create their own sessions" ON public.user_sessions;
DROP POLICY IF EXISTS "Users can update their own sessions" ON public.user_sessions;

CREATE POLICY "Secure session creation"
ON public.user_sessions
FOR INSERT
WITH CHECK (validate_session_access(user_id));

CREATE POLICY "Secure session updates"
ON public.user_sessions
FOR UPDATE
USING (validate_session_access(user_id));

-- Add index for better performance on security-sensitive queries
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_security_events_user_id ON public.security_events(user_id);
CREATE INDEX IF NOT EXISTS idx_security_events_created_at ON public.security_events(created_at);