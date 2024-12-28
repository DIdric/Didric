/*
  # Fix profile schema and constraints

  1. Changes
    - Make headline optional
    - Add default values for required fields
    - Update profile trigger function

  2. Security
    - Maintain existing RLS policies
    - Ensure secure profile creation
*/

-- Make headline optional and add defaults
ALTER TABLE profiles
  ALTER COLUMN headline DROP NOT NULL,
  ALTER COLUMN full_name SET DEFAULT '',
  ALTER COLUMN email SET NOT NULL;

-- Update handle_new_user function to handle optional fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name
  )
  VALUES (
    new.id,
    new.email,
    COALESCE(
      new.raw_user_meta_data->>'full_name',
      split_part(new.email, '@', 1)
    )
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    updated_at = now();
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;