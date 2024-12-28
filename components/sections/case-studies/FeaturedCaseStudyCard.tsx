import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CaseStudy } from '../../../lib/api/case-studies';

export function FeaturedCaseStudyCard({
  id,
  title,
  description,
  category,
  image_url,
  metrics = []
}: CaseStudy) {
  return (
    <div className="group relative bg-[#1a1a1a] rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#ff3b30]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative grid md:grid-cols-2 gap-8 p-8">
        {/* Content */}
        <div className="space-y-6">
          <div>
            <span className="text-sm text-accent-red">{category}</span>
            <h3 className="text-2xl font-bold text-white mt-2">{title}</h3>
            <p className="text-gray-400 leading-relaxed mt-4">{description}</p>
          </div>
          
          {/* Metrics */}
          {metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-6">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          <div>
            <Link 
              to={`/case-studies/${id}`}
              className="group inline-flex items-center text-accent-blue hover:text-accent-blue/80 transition-colors"
            >
              Read Case Study
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <img 
            src={image_url || 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80'} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-transparent to-transparent md:bg-none" />
        </div>
      </div>
    </div>
  );
}