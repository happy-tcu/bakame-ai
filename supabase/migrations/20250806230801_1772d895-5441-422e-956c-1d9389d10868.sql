-- Fix user_sessions RLS policy to allow proper session creation
DROP POLICY IF EXISTS "Allow session creation" ON public.user_sessions;

-- Create new policy that allows session creation with or without user_id
CREATE POLICY "Allow session creation and updates" 
ON public.user_sessions 
FOR INSERT 
WITH CHECK (true);

-- Update the session update policy to be more permissive for analytics
DROP POLICY IF EXISTS "Allow session updates by session_id" ON public.user_sessions;

CREATE POLICY "Allow session updates" 
ON public.user_sessions 
FOR UPDATE 
USING (true);

-- Create newsletter_subscriptions table that's referenced in the code
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on newsletter_subscriptions
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for newsletter_subscriptions
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscriptions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage newsletter subscriptions" 
ON public.newsletter_subscriptions 
FOR ALL 
USING (get_current_user_role() = 'admin');

-- Fix database functions search_path vulnerability
-- Update existing functions to have secure search_path

-- Fix cleanup_old_rate_limits function
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
 RETURNS void
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DELETE FROM public.rate_limits 
WHERE window_start < now() - interval '24 hours';
$function$;

-- Fix get_current_user_role function (already has secure search_path)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
SELECT role::text FROM public.profiles WHERE id = auth.uid();
$function$;

-- Fix handle_new_user function 
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
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

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

-- Create trigger for newsletter_subscriptions updated_at
CREATE TRIGGER update_newsletter_subscriptions_updated_at
  BEFORE UPDATE ON public.newsletter_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add email validation function
CREATE OR REPLACE FUNCTION public.is_valid_email(email_address TEXT)
 RETURNS boolean
 LANGUAGE sql
 IMMUTABLE STRICT
 SET search_path TO 'public', 'pg_temp'
AS $function$
SELECT email_address ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
$function$;

-- Add input length validation triggers
CREATE OR REPLACE FUNCTION public.validate_input_lengths()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  -- Validate email length (max 254 characters per RFC)
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    IF NEW.email IS NOT NULL AND length(NEW.email) > 254 THEN
      RAISE EXCEPTION 'Email address too long (max 254 characters)';
    END IF;
    
    -- Validate name length
    IF NEW.name IS NOT NULL AND length(NEW.name) > 100 THEN
      RAISE EXCEPTION 'Name too long (max 100 characters)';
    END IF;
    
    -- Validate message/content length
    IF TG_TABLE_NAME = 'contact_submissions' AND NEW.message IS NOT NULL AND length(NEW.message) > 5000 THEN
      RAISE EXCEPTION 'Message too long (max 5000 characters)';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Add validation triggers to critical tables
CREATE TRIGGER validate_contact_submissions_input
  BEFORE INSERT OR UPDATE ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_input_lengths();

CREATE TRIGGER validate_newsletter_subscriptions_input
  BEFORE INSERT OR UPDATE ON public.newsletter_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_input_lengths();

CREATE TRIGGER validate_demo_requests_input
  BEFORE INSERT OR UPDATE ON public.demo_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_input_lengths();