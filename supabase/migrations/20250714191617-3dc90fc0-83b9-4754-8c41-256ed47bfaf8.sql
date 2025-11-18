-- Fix RLS policies for user_sessions table
DROP POLICY IF EXISTS "Anyone can insert session data" ON public.user_sessions;
DROP POLICY IF EXISTS "Anyone can update session data" ON public.user_sessions;

-- Create more permissive policies for user_sessions
CREATE POLICY "Allow anonymous session inserts" 
ON public.user_sessions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow anonymous session updates" 
ON public.user_sessions 
FOR UPDATE 
USING (true);

-- Fix IVR sessions policies to be more permissive for anonymous users
DROP POLICY IF EXISTS "Users can create their own IVR sessions" ON public.ivr_sessions;
DROP POLICY IF EXISTS "Users can update their own IVR sessions" ON public.ivr_sessions;

CREATE POLICY "Allow anyone to create IVR sessions" 
ON public.ivr_sessions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow anyone to update IVR sessions" 
ON public.ivr_sessions 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow anyone to select their IVR sessions" 
ON public.ivr_sessions 
FOR SELECT 
USING (true);