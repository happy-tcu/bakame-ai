-- Fix security issue with contact_submissions table
-- Currently only has one broad policy for admins, need specific policies

-- First, ensure RLS is enabled (should already be, but being explicit)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop the existing overly broad policy
DROP POLICY IF EXISTS "Admins can manage contact submissions" ON contact_submissions;

-- Create specific policies for better security

-- Allow anyone to submit contact forms (INSERT only)
CREATE POLICY "Anyone can submit contact forms"
ON contact_submissions
FOR INSERT
WITH CHECK (true);

-- Allow only admins to read contact submissions
CREATE POLICY "Admins can read contact submissions"
ON contact_submissions 
FOR SELECT
USING (get_current_user_role() = 'admin');

-- Allow only admins to update contact submissions (for status changes)
CREATE POLICY "Admins can update contact submissions"
ON contact_submissions
FOR UPDATE
USING (get_current_user_role() = 'admin')
WITH CHECK (get_current_user_role() = 'admin');

-- Allow only admins to delete contact submissions
CREATE POLICY "Admins can delete contact submissions" 
ON contact_submissions
FOR DELETE
USING (get_current_user_role() = 'admin');