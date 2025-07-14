-- Create IVR content table for custom responses
CREATE TABLE public.ivr_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  keywords TEXT[],
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ivr_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active IVR content" 
ON public.ivr_content 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins and creators can manage IVR content" 
ON public.ivr_content 
FOR ALL 
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'creator'::text]));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ivr_content_updated_at
BEFORE UPDATE ON public.ivr_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_ivr_content_category ON public.ivr_content(category);
CREATE INDEX idx_ivr_content_keywords ON public.ivr_content USING GIN(keywords);
CREATE INDEX idx_ivr_content_active ON public.ivr_content(is_active);

-- Create IVR sessions table to track interactions
CREATE TABLE public.ivr_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  user_id UUID,
  status TEXT DEFAULT 'active',
  conversation_history JSONB DEFAULT '[]',
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ivr_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can create their own IVR sessions" 
ON public.ivr_sessions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own IVR sessions" 
ON public.ivr_sessions 
FOR UPDATE 
USING (true);

CREATE POLICY "Admins can view all IVR sessions" 
ON public.ivr_sessions 
FOR SELECT 
USING (get_current_user_role() = 'admin');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ivr_sessions_updated_at
BEFORE UPDATE ON public.ivr_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes
CREATE INDEX idx_ivr_sessions_session_id ON public.ivr_sessions(session_id);
CREATE INDEX idx_ivr_sessions_status ON public.ivr_sessions(status);