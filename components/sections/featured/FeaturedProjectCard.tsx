import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../../../lib/api/projects';

export function FeaturedProjectCard({
  id,
  title,
  description,
  image_url,
  technologies
}: Project) {
  return (
    <Link 
      to={`/projects/${id}`}
      className="group block bg-dark-800 rounded-lg overflow-hidden hover:bg-dark-700 transition-colors"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6">
        {technologies?.[0] && (
          <span className="text-sm text-accent-red">{technologies[0]}</span>
        )}
        <h3 className="text-xl font-bold text-white mt-2 mb-3">{title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center text-accent-blue group-hover:text-accent-blue/80 transition-colors">
          View Project
          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}