/*
  # Update user email address

  1. Changes
    - Update email address from contact@didric.nl to didric@didric.nl in:
      - auth.users table
      - public.profiles table
    
  2. Security
    - No security changes required
    - Maintains existing RLS policies
*/

DO $$ 
DECLARE
  target_user_id uuid := '00000000-0000-0000-0000-000000000000';
BEGIN
  -- Only update if the target email doesn't already exist
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'didric@didric.nl'
  ) THEN
    -- Update auth.users table
    UPDATE auth.users 
    SET 
      email = 'didric@didric.nl',
      updated_at = now()
    WHERE id = target_user_id;

    -- Update profiles table
    UPDATE public.profiles 
    SET 
      email = 'didric@didric.nl',
      updated_at = now()
    WHERE id = target_user_id;
  END IF;
END $$;