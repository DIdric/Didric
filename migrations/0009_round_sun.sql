/*
  # Add case studies table

  1. New Tables
    - `case_studies`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `category` (text)
      - `description` (text)
      - `content` (text)
      - `image_url` (text)
      - `year` (text)
      - `client` (text)
      - `metrics` (jsonb array)
      - `featured` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for public viewing and authenticated management
*/

CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  image_url text,
  year text NOT NULL,
  client text NOT NULL,
  metrics jsonb[] DEFAULT '{}',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Case studies are viewable by everyone"
  ON case_studies FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own case studies"
  ON case_studies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own case studies"
  ON case_studies FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own case studies"
  ON case_studies FOR DELETE
  USING (auth.uid() = user_id);

-- Add indexes
CREATE INDEX IF NOT EXISTS case_studies_user_id_idx ON case_studies(user_id);
CREATE INDEX IF NOT EXISTS case_studies_created_at_idx ON case_studies(created_at DESC);