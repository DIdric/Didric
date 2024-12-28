/*
  # Fix project policies and constraints

  1. Changes
    - Update RLS policies for projects table
    - Add policies for authenticated users to manage their projects
    - Add policies for public read access to projects

  2. Security
    - Enable RLS on projects table
    - Add specific policies for project management
    - Ensure users can only modify their own projects
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public projects are viewable by everyone" ON projects;
DROP POLICY IF EXISTS "Users can manage own projects" ON projects;

-- Update RLS policies for projects
CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);

-- Add NOT NULL constraint to required fields
ALTER TABLE projects 
  ALTER COLUMN user_id SET NOT NULL,
  ALTER COLUMN title SET NOT NULL,
  ALTER COLUMN description SET NOT NULL;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS projects_user_id_idx ON projects(user_id);
CREATE INDEX IF NOT EXISTS projects_created_at_idx ON projects(created_at DESC);