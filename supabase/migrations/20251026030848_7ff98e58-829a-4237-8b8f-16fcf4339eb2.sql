-- Ensure profiles table exists with correct structure
-- This migration will trigger types regeneration

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_display_name ON public.profiles(display_name);

-- Refresh the schema to ensure types are up to date
COMMENT ON TABLE public.profiles IS 'User profile information including display name and phone number';