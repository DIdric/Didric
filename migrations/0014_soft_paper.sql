/*
  # Fix Case Studies Metrics

  1. Changes
    - Fix metrics column to properly handle JSON array
    - Add validation for metrics format
    - Update existing data to ensure correct format

  2. Security
    - Maintain existing RLS policies
*/

-- Temporarily disable the check constraint
ALTER TABLE case_studies DROP CONSTRAINT IF EXISTS metrics_is_array;

-- Update any null metrics to empty array
UPDATE case_studies 
SET metrics = '[]'::jsonb 
WHERE metrics IS NULL;

-- Add new check constraint with better validation
ALTER TABLE case_studies
ADD CONSTRAINT metrics_format_check
CHECK (
  (jsonb_typeof(metrics) = 'array')
  AND
  (
    (jsonb_array_length(metrics) = 0)
    OR
    (
      NOT EXISTS (
        SELECT 1
        FROM jsonb_array_elements(metrics) AS metric
        WHERE NOT (
          metric ? 'label'
          AND metric ? 'value'
          AND jsonb_typeof(metric->'label') = 'string'
          AND jsonb_typeof(metric->'value') = 'string'
        )
      )
    )
  )
);

-- Create function to validate metrics format
CREATE OR REPLACE FUNCTION validate_metrics()
RETURNS trigger AS $$
BEGIN
  -- Ensure metrics is a JSON array
  IF NEW.metrics IS NULL THEN
    NEW.metrics := '[]'::jsonb;
  END IF;

  -- Validate each metric object
  IF jsonb_typeof(NEW.metrics) = 'array' THEN
    IF jsonb_array_length(NEW.metrics) > 0 THEN
      IF EXISTS (
        SELECT 1
        FROM jsonb_array_elements(NEW.metrics) AS metric
        WHERE NOT (
          metric ? 'label'
          AND metric ? 'value'
          AND jsonb_typeof(metric->'label') = 'string'
          AND jsonb_typeof(metric->'value') = 'string'
        )
      ) THEN
        RAISE EXCEPTION 'Invalid metrics format. Each metric must have label and value as strings.';
      END IF;
    END IF;
  ELSE
    RAISE EXCEPTION 'Metrics must be a JSON array';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to validate metrics before insert or update
DROP TRIGGER IF EXISTS validate_metrics_trigger ON case_studies;
CREATE TRIGGER validate_metrics_trigger
  BEFORE INSERT OR UPDATE ON case_studies
  FOR EACH ROW
  EXECUTE FUNCTION validate_metrics();