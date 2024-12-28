/*
  # Portfolio CMS Schema

  1. New Tables
    - `profiles`
      - Basic user information and portfolio details
    - `projects`
      - Portfolio projects with details and links
    - `skills`
      - Technical skills and proficiency levels
    - `social_links`
      - Social media and professional links

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  headline text NOT NULL,
  bio text,
  avatar_url text,
  resume_url text,
  location text,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  github_url text,
  demo_url text,
  technologies text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  name text NOT NULL,
  proficiency integer CHECK (proficiency BETWEEN 1 AND 5),
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Social links table
CREATE TABLE IF NOT EXISTS social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  platform text NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Public projects are viewable by everyone"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own projects"
  ON projects FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Public skills are viewable by everyone"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own skills"
  ON skills FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Public social links are viewable by everyone"
  ON social_links FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own social links"
  ON social_links FOR ALL
  USING (auth.uid() = user_id);