/*
  # Add initial portfolio content

  1. Content Changes
    - Create initial auth user
    - Add profile data
    - Add sample projects
    - Add skills
    - Add social links

  Note: This migration creates a default user that should be replaced with your actual account
*/

-- Create a static UUID for the initial user
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$
DECLARE
  user_id uuid := '00000000-0000-0000-0000-000000000000';
BEGIN
  -- Create auth user first
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
  VALUES (
    user_id,
    'contact@didric.nl',
    crypt('temporary-password', gen_salt('bf')),
    now(),
    now(),
    now()
  );

  -- Insert profile data
  INSERT INTO public.profiles (id, full_name, headline, bio, location, email)
  VALUES (
    user_id,
    'Didric',
    'Creative Director & Visual Designer',
    'With over a decade of experience in visual design and creative direction, I specialize in crafting immersive digital experiences that blend innovative design with purposeful functionality.',
    'Netherlands',
    'contact@didric.nl'
  );

  -- Insert projects
  INSERT INTO public.projects (user_id, title, description, image_url, demo_url, technologies, featured, order_index)
  VALUES
    (
      user_id,
      'Brand Evolution - Tech Startup',
      'A comprehensive brand redesign for a leading tech startup, including visual identity, digital presence, and marketing materials.',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      'https://project1.didric.nl',
      ARRAY['Branding', 'UI/UX', 'Motion Design'],
      true,
      1
    ),
    (
      user_id,
      'Immersive Web Experience',
      'An award-winning website design featuring interactive 3D elements and seamless animations.',
      'https://images.unsplash.com/photo-1494253109108-2e30c049369b',
      'https://project2.didric.nl',
      ARRAY['Web Design', '3D Design', 'Animation'],
      true,
      2
    );

  -- Insert skills
  INSERT INTO public.skills (user_id, name, proficiency, category)
  VALUES
    (user_id, 'Visual Design', 5, 'Design'),
    (user_id, 'Brand Strategy', 5, 'Strategy'),
    (user_id, 'UI/UX Design', 4, 'Design'),
    (user_id, '3D Design', 4, 'Design'),
    (user_id, 'Motion Design', 4, 'Design');

  -- Insert social links
  INSERT INTO public.social_links (user_id, platform, url)
  VALUES
    (user_id, 'LinkedIn', 'https://linkedin.com/in/didric'),
    (user_id, 'Instagram', 'https://instagram.com/didric'),
    (user_id, 'Behance', 'https://behance.net/didric');
END $$;