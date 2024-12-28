import { ProjectCard } from './ProjectCard';
import { FadeIn } from '../../ui/FadeIn';
import type { Project } from '../../../lib/api/projects';

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <FadeIn key={project.id} delay={index * 0.2}>
          <ProjectCard
            id={project.id}
            title={project.title}
            category={project.technologies?.[0] || 'Project'}
            description={project.description}
            image={project.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'}
          />
        </FadeIn>
      ))}
    </div>
  );
}