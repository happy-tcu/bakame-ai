
-- Add missing columns to contact_submissions table
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS subject text;
