import { FadeIn } from '../../ui/FadeIn';
import { ProjectsGrid } from './ProjectsGrid';
import { useProjects } from '../../../hooks/useProjects';

export function ProjectsSection() {
  const { projects, isLoading } = useProjects();
  const featuredProjects = projects?.filter(p => p.featured) || [];
  const otherProjects = projects?.filter(p => !p.featured) || [];

  if (isLoading) {
    return (
      <section className="py-24 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-dark-800 rounded w-1/4" />
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-dark-800 rounded" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">Selected Work</h2>
              <p className="text-gray-400 mt-2">Creative direction & frameworks</p>
            </div>
          </div>
        </FadeIn>

        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <ProjectsGrid projects={featuredProjects} />
          </div>
        )}

        {otherProjects.length > 0 && (
          <ProjectsGrid projects={otherProjects} />
        )}
      </div>
    </section>
  );
}