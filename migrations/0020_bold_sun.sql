-- Drop existing table and recreate with proper structure
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
  metrics jsonb NOT NULL DEFAULT '[]'::jsonb,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT metrics_is_array CHECK (jsonb_typeof(metrics) = 'array')
);

-- Enable RLS
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Case studies are viewable by everyone"
  ON case_studies FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own case studies"
  ON case_studies FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add indexes
CREATE INDEX case_studies_user_id_idx ON case_studies(user_id);
CREATE INDEX case_studies_created_at_idx ON case_studies(created_at DESC);

-- Insert sample case studies
DO $$ 
DECLARE
  default_user_id uuid := '00000000-0000-0000-0000-000000000000';
BEGIN
  -- Only insert if the user exists
  IF EXISTS (SELECT 1 FROM profiles WHERE id = default_user_id) THEN
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
    ) VALUES 
    (
      default_user_id,
      'SkyShowtime Launch',
      'Brand Design',
      'Complete brand identity and digital experience design for a major streaming platform launch across European markets.',
      E'# Overview\n\nA comprehensive brand launch project for SkyShowtime, involving the creation of a new visual identity system and digital presence strategy.\n\n# Challenge\n\nThe main challenge was to create a distinctive brand identity that would stand out in a crowded streaming market while maintaining consistency across multiple touchpoints.\n\n# Solution\n\nWe developed a flexible design system that could adapt to various platforms while maintaining brand recognition. The system includes a dynamic logo, custom typography, and a unique color palette.\n\n# Impact\n\nSuccessful launch across multiple European markets with high brand recognition scores and positive user feedback.',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
      '2023',
      'SkyShowtime',
      '[{"label": "User Adoption", "value": "2.5M+"}, {"label": "Platform Rating", "value": "4.8/5"}]',
      true
    );
  END IF;
END $$;