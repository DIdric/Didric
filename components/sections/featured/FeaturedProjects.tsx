import { useProjects } from '../../../hooks/useProjects';
import { FeaturedProjectCard } from './FeaturedProjectCard';
import { FadeIn } from '../../ui/FadeIn';

export function FeaturedProjects() {
  const { projects, isLoading } = useProjects();
  const featuredProjects = projects?.filter(p => p.featured) || [];

  if (isLoading) {
    return (
      <section className="py-24 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-dark-800 rounded w-1/4" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-96 bg-dark-800 rounded" />
              <div className="h-96 bg-dark-800 rounded" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-24 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl font-bold text-white mb-12">Featured Work</h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.2}>
              <FeaturedProjectCard {...project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}