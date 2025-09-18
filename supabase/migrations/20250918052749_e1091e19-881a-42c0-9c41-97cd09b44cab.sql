-- Final security fixes: Update remaining functions with proper search paths
CREATE OR REPLACE FUNCTION public.is_valid_email(email_address text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE STRICT
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
SELECT email_address ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
$function$;

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

CREATE OR REPLACE FUNCTION public.match_rag_chunks(query_embedding vector, match_count integer DEFAULT 5, min_similarity double precision DEFAULT 0.2)
RETURNS TABLE(content text, similarity double precision, source text, url text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
  SELECT c.content,
         1 - (c.embedding <=> query_embedding) AS similarity,
         d.source,
         d.url
  FROM public.rag_chunks c
  JOIN public.rag_documents d ON d.id = c.document_id
  WHERE c.embedding IS NOT NULL
  ORDER BY c.embedding <=> query_embedding
  LIMIT match_count;
$function$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = _user_id AND ur.role = _role
  );
$function$;

CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
SELECT role::text FROM public.profiles WHERE id = auth.uid();
$function$;

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