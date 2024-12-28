interface CaseStudySectionProps {
  title: string;
  content: string;
}

export function CaseStudySection({ title, content }: CaseStudySectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="text-gray-400 mt-4 leading-relaxed">
        {content}
      </p>
    </section>
  );
}