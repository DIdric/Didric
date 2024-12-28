/*
  # Add initial case studies

  1. Changes
    - Insert initial case studies data
    - Set default user as owner
*/

DO $$ 
DECLARE
  default_user_id uuid := '00000000-0000-0000-0000-000000000000';
BEGIN
  -- Insert case studies
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
    'Total Brand Experience Framework',
    'Brand Strategy',
    'A systematic approach to aligning brand values with customer experience, ensuring consistency across all touchpoints while maintaining flexibility for different market contexts.',
    E'# Overview\n\nA comprehensive methodology for mapping, analyzing, and optimizing every customer interaction with the brand, from initial awareness through long-term loyalty.\n\n# Challenge\n\nModern brands face increasing complexity in maintaining consistency across digital and physical touchpoints while adapting to rapid market changes and evolving customer expectations.\n\n# Solution\n\nThe Total Brand Experience Framework provides a structured methodology for mapping, analyzing, and optimizing every customer interaction with the brand, from initial awareness through long-term loyalty.\n\n# Impact\n\nImplementation of this framework has led to measurable improvements in brand consistency, customer satisfaction, and team alignment across multiple client projects.',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
    '2024',
    'Various Clients',
    ARRAY[
      '{"label": "Brand Consistency", "value": "98%"}',
      '{"label": "Customer Satisfaction", "value": "+45%"}'
    ]::jsonb[],
    true
  ),
  (
    default_user_id,
    'SkyShowtime Launch',
    'Brand Design',
    'Complete brand identity and digital experience design for a major streaming platform launch across European markets.',
    E'# Overview\n\nA comprehensive brand launch project for SkyShowtime, involving the creation of a new visual identity system and digital presence strategy.\n\n# Challenge\n\nThe main challenge was to create a distinctive brand identity that would stand out in a crowded streaming market while maintaining consistency across multiple touchpoints.\n\n# Solution\n\nWe developed a flexible design system that could adapt to various platforms while maintaining brand recognition. The system includes a dynamic logo, custom typography, and a unique color palette.\n\n# Impact\n\nSuccessful launch across multiple European markets with high brand recognition scores and positive user feedback.',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
    '2023',
    'SkyShowtime',
    ARRAY[
      '{"label": "User Adoption", "value": "2.5M+"}',
      '{"label": "Platform Rating", "value": "4.8/5"}'
    ]::jsonb[],
    true
  );
END $$;