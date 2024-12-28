/*
  # Fix Case Studies Table

  1. Changes
    - Fix metrics column type to be jsonb instead of jsonb[]
    - Add proper constraints and defaults
    - Recreate table with correct structure
    - Add proper indexes and triggers
    - Add sample data with correct format

  2. Security
    - Enable RLS
    - Add proper policies for data access
*/

-- Drop existing table and recreate with correct structure
DROP TABLE IF EXISTS case_studies CASCADE;

CREATE TABLE case_studies (
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
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT metrics_is_array CHECK (jsonb_typeof(metrics) = 'array')
);

-- Enable RLS
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Case studies are viewable by everyone"
  ON case_studies FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage their own case studies"
  ON case_studies FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add indexes
CREATE INDEX case_studies_user_id_idx ON case_studies(user_id);
CREATE INDEX case_studies_created_at_idx ON case_studies(created_at DESC);

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

-- Insert sample data
INSERT INTO case_studies (
  user_id,
  title,
  category,
  description,
  content,
  image_url,
  year,
  client,
  metrics,
  featured
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'Total Brand Experience Framework',
  'Brand Strategy',
  'A systematic approach to aligning brand values with customer experience.',
  '# Overview\n\nA comprehensive methodology for brand alignment.',
  'https://images.unsplash.com/photo-1552664730-d307ca884978',
  '2024',
  'Various Clients',
  '[{"label": "Brand Consistency", "value": "98%"}, {"label": "Customer Satisfaction", "value": "+45%"}]',
  true
);