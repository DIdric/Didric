import { CaseStudyMeta } from './CaseStudyMeta';
import { CaseStudySection } from './CaseStudySection';

export function CaseStudy() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-white mb-6">
        Total Brand Experience Framework
      </h1>
      
      <CaseStudyMeta 
        category="Brand Strategy"
        year="2024"
      />

      <div className="space-y-12">
        <CaseStudySection
          title="Overview"
          content="A systematic approach to aligning brand values with customer experience, ensuring consistency across all touchpoints while maintaining flexibility for different market contexts."
        />
        
        <CaseStudySection
          title="Challenge"
          content="Modern brands face increasing complexity in maintaining consistency across digital and physical touchpoints while adapting to rapid market changes and evolving customer expectations."
        />
        
        <CaseStudySection
          title="Solution"
          content="The Total Brand Experience Framework provides a structured methodology for mapping, analyzing, and optimizing every customer interaction with the brand, from initial awareness through long-term loyalty."
        />
        
        <CaseStudySection
          title="Impact"
          content="Implementation of this framework has led to measurable improvements in brand consistency, customer satisfaction, and team alignment across multiple client projects."
        />
      </div>
    </article>
  );
}