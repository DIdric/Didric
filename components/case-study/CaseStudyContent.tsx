import React from 'react';

interface CaseStudyContentProps {
  children: React.ReactNode;
}

export function CaseStudyContent({ children }: CaseStudyContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      {children}
    </div>
  );
}