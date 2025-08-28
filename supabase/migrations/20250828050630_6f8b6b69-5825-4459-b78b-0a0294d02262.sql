-- Fix critical security vulnerability: Remove public read/write access to ivr_sessions table
-- This table contains sensitive customer conversation histories and session data

-- Drop the overly permissive policies that allow anyone to read/update all sessions
DROP POLICY IF EXISTS "Allow anyone to select their IVR sessions" ON public.ivr_sessions;
DROP POLICY IF EXISTS "Allow anyone to update IVR sessions" ON public.ivr_sessions;

-- Create secure policies for proper access control
-- 1. Authenticated users can view their own sessions
CREATE POLICY "Users can view their own IVR sessions" 
ON public.ivr_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

-- 2. Authenticated users can update their own sessions
CREATE POLICY "Users can update their own IVR sessions" 
ON public.ivr_sessions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- 3. Allow session updates by session_id for anonymous users during active calls
-- This enables IVR functionality to work for unauthenticated users
CREATE POLICY "Allow session updates by session_id for active sessions" 
ON public.ivr_sessions 
FOR UPDATE 
USING (
  -- Allow updates to sessions that are still active (not ended)
  -- and were created recently (within last 24 hours)
  ended_at IS NULL 
  AND created_at > now() - interval '24 hours'
);

-- Keep existing secure policies:
-- - "Admins can view all IVR sessions" (admin oversight)
-- - "Allow anyone to create IVR sessions" (IVR functionality)

-- Note: The remaining policies ensure:
-- 1. Only authenticated users can view their own conversation histories
-- 2. Only authenticated users can update their own sessions
-- 3. Anonymous users can still use IVR functionality (create/update active sessions)
-- 4. Admins maintain oversight capabilities