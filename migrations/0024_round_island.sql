/*
  # Add Frameworks Table
  
  1. New Tables
    - `frameworks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text) 
      - `content` (text)
      - `category` (text)
      - `metrics` (jsonb array)
      - `order_index` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for public viewing and authenticated management
*/

CREATE TABLE frameworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  metrics jsonb NOT NULL DEFAULT '[]'::jsonb,
  order_index integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT metrics_is_array CHECK (jsonb_typeof(metrics) = 'array')
);

-- Enable RLS
ALTER TABLE frameworks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Frameworks are viewable by everyone"
  ON frameworks FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own frameworks"
  ON frameworks FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add indexes
CREATE INDEX frameworks_user_id_idx ON frameworks(user_id);
CREATE INDEX frameworks_created_at_idx ON frameworks(created_at DESC);
CREATE INDEX frameworks_order_idx ON frameworks(order_index ASC);

-- Add updated_at trigger
CREATE TRIGGER update_frameworks_updated_at
  BEFORE UPDATE ON frameworks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();