
-- First, let's check what constraint is causing the issue and drop it if it's too restrictive
ALTER TABLE public.resources DROP CONSTRAINT IF EXISTS resources_type_check;

-- Add a more flexible constraint for resource types
ALTER TABLE public.resources ADD CONSTRAINT resources_type_check 
CHECK (type IN ('PDF', 'ZIP', 'MP4', 'MP3', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX'));

-- Clear any existing resources first
DELETE FROM public.resources;

-- Insert sample resources with correct data types
INSERT INTO public.resources (title, description, type, category, is_featured, tags, external_url) VALUES
('IVR API Documentation', 'Complete API reference for IVR system integration', 'PDF', 'Documentation', true, ARRAY['api', 'documentation', 'integration'], 'https://example.com/api-docs.pdf'),
('Deployment Guide', 'Step-by-step guide for offline IVR deployment', 'PDF', 'Documentation', false, ARRAY['deployment', 'guide', 'setup'], 'https://example.com/deployment.pdf'),
('Configuration Manual', 'Advanced configuration options and best practices', 'PDF', 'Documentation', false, ARRAY['configuration', 'manual', 'advanced'], 'https://example.com/config.pdf'),
('IVR Voice Samples', 'Sample voice prompts and responses', 'ZIP', 'Audio & Voice Samples', true, ARRAY['voice', 'samples', 'audio'], 'https://example.com/voice-samples.zip'),
('Kinyarwanda Dataset Sample', 'Sample from our research dataset', 'ZIP', 'Audio & Voice Samples', false, ARRAY['dataset', 'kinyarwanda', 'research'], 'https://example.com/dataset.zip'),
('Multi-language Pack', 'Voice samples in multiple languages', 'ZIP', 'Audio & Voice Samples', false, ARRAY['multilingual', 'voice', 'pack'], 'https://example.com/multilang.zip'),
('IVR System Setup', 'Complete setup tutorial for IVR systems', 'MP4', 'Video Tutorials', true, ARRAY['tutorial', 'setup', 'video'], 'https://example.com/setup.mp4'),
('Enterprise Integration', 'How to integrate IVR with enterprise systems', 'MP4', 'Video Tutorials', false, ARRAY['enterprise', 'integration', 'tutorial'], 'https://example.com/enterprise.mp4'),
('Government Deployment', 'Best practices for government IVR deployment', 'MP4', 'Video Tutorials', false, ARRAY['government', 'deployment', 'best-practices'], 'https://example.com/government.mp4'),
('Python SDK', 'Complete Python SDK with IVR integration tools', 'ZIP', 'Development Tools', true, ARRAY['python', 'sdk', 'development'], 'https://example.com/python-sdk.zip'),
('JavaScript Library', 'JavaScript library for web-based IVR interfaces', 'ZIP', 'Development Tools', false, ARRAY['javascript', 'library', 'web'], 'https://example.com/js-lib.zip'),
('Mobile SDK', 'Mobile development tools for IVR applications', 'ZIP', 'Development Tools', false, ARRAY['mobile', 'sdk', 'development'], 'https://example.com/mobile-sdk.zip');

-- Update download counts with some sample data
UPDATE public.resources SET download_count = FLOOR(RANDOM() * 500 + 50);
