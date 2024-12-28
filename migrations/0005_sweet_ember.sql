/*
  # Add profile management trigger

  1. Changes
    - Add trigger to automatically create profiles for new users
    - Add trigger to update profile email when user email changes
    - Add function to handle profile management

  2. Security
    - Maintain RLS policies
    - Ensure data consistency between auth.users and profiles
*/

-- Create trigger function for profile management
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create trigger function for email updates
CREATE OR REPLACE FUNCTION public.handle_user_email_change()
RETURNS trigger AS $$
BEGIN
  UPDATE public.profiles
  SET email = new.email, updated_at = now()
  WHERE id = new.id;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for email updates
CREATE OR REPLACE TRIGGER on_auth_user_email_updated
  AFTER UPDATE OF email ON auth.users
  FOR EACH ROW
  WHEN (OLD.email IS DISTINCT FROM NEW.email)
  EXECUTE FUNCTION public.handle_user_email_change();