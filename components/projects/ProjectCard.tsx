import { cn } from '../../utils/cn';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  link: string;
  className?: string;
}

export function ProjectCard({ title, category, image, link, className }: ProjectCardProps) {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("block group relative overflow-hidden rounded-lg", className)}
    >
      <div 
        className="aspect-square bg-cover bg-center w-full"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div>
            <span className="text-sm text-accent-red">{category}</span>
            <h3 className="text-xl font-bold text-white mt-2">{title}</h3>
          </div>
        </div>
      </div>
    </a>
  );
}