
-- Create analytics table to track page views and user interactions
CREATE TABLE public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  event_type TEXT NOT NULL, -- 'page_view', 'button_click', 'form_submit', etc.
  event_data JSONB,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  tags TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources table
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('pdf', 'video', 'article', 'webinar', 'case_study')),
  file_url TEXT,
  external_url TEXT,
  thumbnail_url TEXT,
  category TEXT,
  tags TEXT[],
  download_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact submissions table
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  solution_type TEXT, -- 'education', 'enterprise', 'government'
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create demo requests table
CREATE TABLE public.demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  solution_type TEXT NOT NULL,
  message TEXT,
  preferred_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create waitlist table
CREATE TABLE public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  company TEXT,
  solution_interest TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Analytics policies (public read for aggregated data, authenticated users can track their own)
CREATE POLICY "Anyone can view aggregated analytics" ON public.analytics
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert analytics" ON public.analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage all analytics" ON public.analytics
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- Blog posts policies
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins and creators can manage blog posts" ON public.blog_posts
  FOR ALL USING (public.get_current_user_role() IN ('admin', 'creator'));

-- Resources policies
CREATE POLICY "Anyone can view resources" ON public.resources
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can download resources" ON public.resources
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins and creators can manage resources" ON public.resources
  FOR ALL USING (public.get_current_user_role() IN ('admin', 'creator'));

-- Contact submissions policies (admin only)
CREATE POLICY "Admins can manage contact submissions" ON public.contact_submissions
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- Demo requests policies (admin only)
CREATE POLICY "Admins can manage demo requests" ON public.demo_requests
  FOR ALL USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Anyone can create demo requests" ON public.demo_requests
  FOR INSERT WITH CHECK (true);

-- Waitlist policies
CREATE POLICY "Anyone can join waitlist" ON public.waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage waitlist" ON public.waitlist
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- Create indexes for better performance
CREATE INDEX idx_analytics_page_path ON public.analytics(page_path);
CREATE INDEX idx_analytics_created_at ON public.analytics(created_at);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at);
CREATE INDEX idx_resources_type ON public.resources(type);
CREATE INDEX idx_resources_category ON public.resources(category);
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX idx_demo_requests_status ON public.demo_requests(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
