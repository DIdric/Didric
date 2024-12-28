import { ProjectGrid } from './ProjectGrid';

export function Projects() {
  return (
    <section id="projects" className="relative z-10 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 bg-gradient-accent bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <ProjectGrid />
      </div>
    </section>
  );
}