import { ProjectCard } from './ProjectCard';
import { FadeIn } from '../ui/FadeIn';

const PROJECTS = [
  {
    title: "Brand Evolution",
    category: "Brand Design",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    title: "Digital Experience",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1494253109108-2e30c049369b?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    title: "E-commerce Platform",
    category: "UX Design",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    link: "#"
  }
];

export function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PROJECTS.map((project, index) => (
        <FadeIn key={project.title} delay={index * 0.2}>
          <ProjectCard {...project} />
        </FadeIn>
      ))}
    </div>
  );
}