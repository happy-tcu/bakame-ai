
-- Fix critical RLS policy issues and add missing policies

-- 1. Create security definer function to avoid recursive RLS policy issues
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role::text FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- 2. Drop existing problematic policies that might cause recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- 3. Recreate admin policies using the security definer function
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    auth.uid() = id OR public.get_current_user_role() = 'admin'
  );

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    auth.uid() = id OR public.get_current_user_role() = 'admin'
  );

-- 4. Add missing INSERT policy for profiles
CREATE POLICY "Users can insert their own profile on signup" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 5. Add missing DELETE policy for profiles (admin only)
CREATE POLICY "Admins can delete profiles" ON public.profiles
  FOR DELETE USING (public.get_current_user_role() = 'admin');

-- 6. Fix organizations policies to use the security definer function
DROP POLICY IF EXISTS "Admins can manage all organizations" ON public.organizations;

CREATE POLICY "Admins can manage all organizations" ON public.organizations
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- 7. Ensure proper constraints on critical tables
ALTER TABLE public.profiles ALTER COLUMN email SET NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN role SET NOT NULL;

-- 8. Add indexes for better performance and security
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_organizations_created_by ON public.organizations(created_by);

-- 9. Update the handle_new_user function to be more robust
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;
