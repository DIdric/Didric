import { FadeIn } from '../../ui/FadeIn';
import { FeaturedCaseStudyCard } from './FeaturedCaseStudyCard';
import { useCaseStudies } from '../../../hooks/useCaseStudies';

export function FeaturedCaseStudies() {
  const { caseStudies, isLoading } = useCaseStudies();
  const featuredCaseStudies = caseStudies?.filter(cs => cs.featured) || [];

  if (isLoading) {
    return (
      <section className="py-24 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-dark-800 rounded w-1/4" />
            <div className="space-y-12">
              {[1, 2].map((i) => (
                <div key={i} className="bg-dark-800 rounded-lg h-64" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredCaseStudies.length === 0) {
    return null;
  }

  return (
    <section className="py-24 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl font-bold text-white">Case Studies</h2>
          <p className="text-gray-400 mt-2">Deep dives into selected projects and frameworks</p>
        </FadeIn>

        <div className="mt-12 space-y-12">
          {featuredCaseStudies.map((study, index) => (
            <FadeIn key={study.id} delay={index * 0.2}>
              <FeaturedCaseStudyCard {...study} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}