-- Fix metrics column type and constraints
ALTER TABLE case_studies
  ALTER COLUMN metrics TYPE jsonb USING COALESCE(metrics, '[]'::jsonb),
  ALTER COLUMN metrics SET DEFAULT '[]'::jsonb;

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

-- Recreate policies with better security
DROP POLICY IF EXISTS "Case studies are viewable by everyone" ON case_studies;
DROP POLICY IF EXISTS "Users can create their own case studies" ON case_studies;
DROP POLICY IF EXISTS "Users can update their own case studies" ON case_studies;
DROP POLICY IF EXISTS "Users can delete their own case studies" ON case_studies;

CREATE POLICY "Case studies are viewable by everyone"
  ON case_studies FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage their own case studies"
  ON case_studies FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);