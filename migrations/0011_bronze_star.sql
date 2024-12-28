/*
  # Fix Case Studies Schema

  1. Changes
    - Fix metrics column type to be jsonb instead of jsonb[]
    - Add updated_at trigger
    - Update RLS policies for better security

  2. Security
    - Enable RLS
    - Add policies for viewing and managing case studies
*/

-- Drop and recreate case_studies table with correct column types
CREATE TABLE IF NOT EXISTS case_studies_new (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  image_url text,
  year text NOT NULL,
  client text NOT NULL,
  metrics jsonb DEFAULT '[]'::jsonb,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Copy data if old table exists
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'case_studies') THEN
    INSERT INTO case_studies_new (
      id, user_id, title, category, description, content, 
      image_url, year, client, metrics, featured, 
      created_at, updated_at
    )
    SELECT 
      id, user_id, title, category, description, content,
      image_url, year, client, 
      CASE 
        WHEN metrics IS NULL THEN '[]'::jsonb
        WHEN jsonb_typeof(metrics) = 'array' THEN metrics::jsonb
        ELSE '[]'::jsonb
      END,
      featured, created_at, updated_at
    FROM case_studies;

    -- Drop old table
    DROP TABLE case_studies;
  END IF;
END $$;

-- Rename new table to case_studies
ALTER TABLE case_studies_new RENAME TO case_studies;

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_case_studies_updated_at
  BEFORE UPDATE ON case_studies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Recreate policies with better security
CREATE POLICY "Case studies are viewable by everyone"
  ON case_studies FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage their own case studies"
  ON case_studies FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add indexes
CREATE INDEX IF NOT EXISTS case_studies_user_id_idx ON case_studies(user_id);
CREATE INDEX IF NOT EXISTS case_studies_created_at_idx ON case_studies(created_at DESC);