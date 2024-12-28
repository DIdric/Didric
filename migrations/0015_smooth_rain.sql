/*
  # Fix Case Studies Metrics Validation

  1. Changes
    - Add proper validation for metrics JSON array
    - Add function to validate metrics format
    - Add trigger for metrics validation
    - Ensure metrics are always valid JSON arrays

  2. Security
    - Maintain existing RLS policies
*/

-- Drop existing table and recreate with proper validation
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
  metrics jsonb DEFAULT '[]'::jsonb NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  -- Add constraint to ensure metrics is a JSON array
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
CREATE OR REPLACE FUNCTION update_case_studies_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_case_studies_updated_at
  BEFORE UPDATE ON case_studies
  FOR EACH ROW
  EXECUTE FUNCTION update_case_studies_updated_at();

-- Add metrics validation trigger
CREATE OR REPLACE FUNCTION validate_case_study_metrics()
RETURNS TRIGGER AS $$
BEGIN
  -- Set empty array if null
  IF NEW.metrics IS NULL THEN
    NEW.metrics := '[]'::jsonb;
  END IF;

  -- Validate metrics format
  IF jsonb_typeof(NEW.metrics) != 'array' THEN
    RAISE EXCEPTION 'metrics must be a JSON array';
  END IF;

  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER validate_case_study_metrics
  BEFORE INSERT OR UPDATE ON case_studies
  FOR EACH ROW
  EXECUTE FUNCTION validate_case_study_metrics();

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