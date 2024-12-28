import { Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  className?: string;
}

export function ProjectCard({ id, title, category, description, image, className }: ProjectCardProps) {
  return (
    <Link 
      to={`/case-studies/${id}`}
      className={cn("group relative block overflow-hidden rounded-lg aspect-square", className)}
    >
      {/* Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Overlay - only visible on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content - only visible on hover */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-sm text-accent-red">{category}</span>
        <h3 className="text-xl font-bold text-white mt-2">{title}</h3>
        <p className="text-gray-300 text-sm mt-2 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}