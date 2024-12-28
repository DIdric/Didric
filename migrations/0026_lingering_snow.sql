-- Insert initial frameworks data
DO $$ 
DECLARE
  default_user_id uuid;
BEGIN
  -- Get the first user ID from auth.users
  SELECT id INTO default_user_id FROM auth.users LIMIT 1;

  -- Only insert if we found a user
  IF default_user_id IS NOT NULL THEN
    -- Experience Design Hormones Framework
    INSERT INTO frameworks (
      user_id,
      title,
      category,
      description,
      content,
      metrics,
      order_index
    ) VALUES (
      default_user_id,
      'Experience Design Hormones',
      'UX Design',
      'A neurobiological framework for creating engaging digital experiences based on the four key happiness hormones.',
      E'# Overview\n\nThe Experience Design Hormones framework is based on understanding and triggering the four key happiness hormones through digital experiences: Dopamine, Serotonin, Oxytocin, and Endorphins.\n\n# Key Components\n\n## 1. Dopamine Triggers\nImplementation of achievement systems, progress tracking, and reward mechanisms that create anticipation and satisfaction.\n\n## 2. Serotonin Boosters\nDesign elements that promote status, recognition, and accomplishment through social proof and achievement showcasing.\n\n## 3. Oxytocin Builders\nFeatures that foster connection, trust, and belonging through community interaction and personalized experiences.\n\n## 4. Endorphin Activation\nIncorporating elements of surprise, delight, and positive challenge that create a sense of accomplishment.',
      '[{"label": "Implementation", "value": "3 Major Brands"}, {"label": "Recognition", "value": "Industry Awards"}]',
      0
    ),
    -- Total Brand Experience Framework
    (
      default_user_id,
      'Total Brand Experience',
      'Brand Strategy',
      'Aligning creative expression with customer experience through systematic activation frameworks.',
      E'# Overview\n\nThe Total Brand Experience framework provides a systematic approach to ensuring brand consistency across all customer touchpoints while maintaining flexibility for different contexts.\n\n# Methodology\n\nA comprehensive system for mapping, analyzing, and optimizing every customer interaction with the brand, from initial awareness through long-term loyalty.',
      '[{"label": "Brand Consistency", "value": "98%"}, {"label": "Customer Satisfaction", "value": "+45%"}]',
      1
    );
  END IF;
END $$;