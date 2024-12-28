import { Brain, Scale, Users } from 'lucide-react';

export const frameworks = [
  {
    id: 'experience-design-hormones',
    title: 'Experience Design Hormones',
    description: 'A neurobiological framework for creating engaging digital experiences based on the four key happiness hormones.',
    icon: Brain,
    content: (
      <>
        <h2>Overview</h2>
        <p>
          The Experience Design Hormones framework is based on understanding and 
          triggering the four key happiness hormones through digital experiences: 
          Dopamine, Serotonin, Oxytocin, and Endorphins.
        </p>

        <h2>Key Components</h2>
        <h3>1. Dopamine Triggers</h3>
        <p>
          Implementation of achievement systems, progress tracking, and reward 
          mechanisms that create anticipation and satisfaction.
        </p>

        <h3>2. Serotonin Boosters</h3>
        <p>
          Design elements that promote status, recognition, and accomplishment 
          through social proof and achievement showcasing.
        </p>

        <h3>3. Oxytocin Builders</h3>
        <p>
          Features that foster connection, trust, and belonging through 
          community interaction and personalized experiences.
        </p>

        <h3>4. Endorphin Activation</h3>
        <p>
          Incorporating elements of surprise, delight, and positive challenge 
          that create a sense of accomplishment.
        </p>
      </>
    ),
    metrics: [
      { label: "Implementation", value: "3 Major Brands" },
      { label: "Recognition", value: "Industry Awards" }
    ]
  },
  {
    id: 'total-brand-experience',
    title: 'Total Brand Experience',
    description: 'Aligning creative expression with customer experience through systematic activation frameworks.',
    icon: Scale,
    content: (
      <>
        <h2>Overview</h2>
        <p>
          The Total Brand Experience framework provides a systematic approach to 
          ensuring brand consistency across all customer touchpoints while 
          maintaining flexibility for different contexts.
        </p>

        <h2>Methodology</h2>
        <p>
          A comprehensive system for mapping, analyzing, and optimizing every 
          customer interaction with the brand, from initial awareness through 
          long-term loyalty.
        </p>
      </>
    ),
    metrics: [
      { label: "Brand Consistency", value: "98%" },
      { label: "Customer Satisfaction", value: "+45%" }
    ]
  }
];