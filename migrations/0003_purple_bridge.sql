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
BEGIN
  -- Update auth.users table
  UPDATE auth.users 
  SET 
    email = 'didric@didric.nl',
    updated_at = now()
  WHERE email = 'contact@didric.nl';

  -- Update profiles table
  UPDATE public.profiles 
  SET 
    email = 'didric@didric.nl',
    updated_at = now()
  WHERE email = 'contact@didric.nl';
END $$;