
-- Allow anyone to read user_roles (needed to identify mentors on Find Mentors page)
CREATE POLICY "Anyone can read roles" ON public.user_roles
  FOR SELECT USING (true);

-- Drop the more restrictive policy
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;
