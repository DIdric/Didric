interface CaseStudyMetaProps {
  category: string;
  year: string;
}

export function CaseStudyMeta({ category, year }: CaseStudyMetaProps) {
  return (
    <div className="flex gap-4 mb-12">
      <span className="text-gray-400">{category}</span>
      <span className="text-gray-400">•</span>
      <span className="text-gray-400">{year}</span>
    </div>
  );
}