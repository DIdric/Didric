-- Insert SkyShowtime Launch case study
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
  'SkyShowtime Launch',
  'Brand Design',
  'Complete brand identity and digital experience design for a major streaming platform launch across European markets.',
  E'# Overview\n\nA comprehensive brand launch project for SkyShowtime, involving the creation of a new visual identity system and digital presence strategy.\n\n# Challenge\n\nThe main challenge was to create a distinctive brand identity that would stand out in a crowded streaming market while maintaining consistency across multiple touchpoints.\n\n# Solution\n\nWe developed a flexible design system that could adapt to various platforms while maintaining brand recognition. The system includes a dynamic logo, custom typography, and a unique color palette.\n\n# Impact\n\nSuccessful launch across multiple European markets with high brand recognition scores and positive user feedback.',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
  '2023',
  'SkyShowtime',
  '[{"label": "User Adoption", "value": "2.5M+"}, {"label": "Platform Rating", "value": "4.8/5"}]',
  true
)
ON CONFLICT (id) DO NOTHING;