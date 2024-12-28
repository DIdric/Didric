import { FadeIn } from '../ui/FadeIn';
import { ProjectsGrid } from './projects/ProjectsGrid';

export default function ProjectsSection() {
  return (
    <section className="py-24 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">Selected Work</h2>
              <p className="text-gray-400 mt-2">Creative direction & frameworks</p>
            </div>
          </div>
        </FadeIn>

        <ProjectsGrid />
      </div>
    </section>
  );
}