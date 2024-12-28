-- Drop existing triggers and functions
DROP TRIGGER IF EXISTS handle_case_study_metrics_trigger ON case_studies;
DROP FUNCTION IF EXISTS handle_case_study_metrics();

-- Recreate case_studies table with proper structure
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
  metrics jsonb NOT NULL DEFAULT '[]'::jsonb,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Copy data from old table if it exists
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
      COALESCE(metrics, '[]'::jsonb),
      COALESCE(featured, false),
      created_at, updated_at
    FROM case_studies;

    -- Drop old table
    DROP TABLE case_studies;
  END IF;
END $$;

-- Rename new table
ALTER TABLE case_studies_new RENAME TO case_studies;

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
  '00000000-0000-0000-0000-000000000000',
  'SkyShowtime Launch',
  'Brand Design',
  'Complete brand identity and digital experience design for a major streaming platform launch across European markets.',
  E'# Overview\n\nA comprehensive brand launch project for SkyShowtime, involving the creation of a new visual identity system and digital presence strategy.\n\n# Challenge\n\nThe main challenge was to create a distinctive brand identity that would stand out in a crowded streaming market while maintaining consistency across multiple touchpoints.\n\n# Solution\n\nWe developed a flexible design system that could adapt to various platforms while maintaining brand recognition. The system includes a dynamic logo, custom typography, and a unique color palette.\n\n# Impact\n\nSuccessful launch across multiple European markets with high brand recognition scores and positive user feedback.',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
  '2023',
  'SkyShowtime',
  '[{"label": "User Adoption", "value": "2.5M+"}, {"label": "Platform Rating", "value": "4.8/5"}]',
  true
),
(
  '00000000-0000-0000-0000-000000000000',
  'Total Brand Experience Framework',
  'Brand Strategy',
  'A systematic approach to aligning brand values with customer experience.',
  E'# Overview\n\nA comprehensive methodology for brand alignment and customer experience optimization.',
  'https://images.unsplash.com/photo-1552664730-d307ca884978',
  '2024',
  'Various Clients',
  '[{"label": "Brand Consistency", "value": "98%"}, {"label": "Customer Satisfaction", "value": "+45%"}]',
  true
)
ON CONFLICT (id) DO NOTHING;