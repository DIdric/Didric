/*
  # Fix Case Studies Table

  1. Changes
    - Drop existing metrics constraints and triggers
    - Add new metrics validation
    - Update existing data
*/

-- Drop existing triggers and constraints
DROP TRIGGER IF EXISTS validate_case_study_metrics ON case_studies;
DROP FUNCTION IF EXISTS validate_case_study_metrics();
ALTER TABLE case_studies DROP CONSTRAINT IF EXISTS metrics_is_array;

-- Update any null metrics to empty array
UPDATE case_studies 
SET metrics = '[]'::jsonb 
WHERE metrics IS NULL;

-- Add NOT NULL constraint with default
ALTER TABLE case_studies 
  ALTER COLUMN metrics SET DEFAULT '[]'::jsonb,
  ALTER COLUMN metrics SET NOT NULL;

-- Add check constraint for metrics format
ALTER TABLE case_studies
ADD CONSTRAINT metrics_format_check
CHECK (jsonb_typeof(metrics) = 'array');

-- Create function to handle metrics validation
CREATE OR REPLACE FUNCTION handle_case_study_metrics()
RETURNS trigger AS $$
BEGIN
  -- Set default empty array if null
  IF NEW.metrics IS NULL THEN
    NEW.metrics := '[]'::jsonb;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for metrics validation
CREATE TRIGGER handle_case_study_metrics_trigger
  BEFORE INSERT OR UPDATE ON case_studies
  FOR EACH ROW
  EXECUTE FUNCTION handle_case_study_metrics();