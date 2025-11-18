-- Fix critical security vulnerability: Remove public read access to analytics table
-- This table contains sensitive user data (IP addresses, user agents, session IDs, browsing behavior)

-- Drop the overly permissive policy that allows anyone to view analytics
DROP POLICY IF EXISTS "Anyone can view aggregated analytics" ON public.analytics;

-- The existing policies we're keeping:
-- 1. "Admins can manage all analytics" - allows admin users to read/write analytics
-- 2. "Authenticated users can insert analytics" - allows tracking functionality to work

-- Verify our remaining policies are secure:
-- This ensures only authenticated administrators can view analytics data
-- while maintaining the ability to track user interactions for legitimate analytics purposes