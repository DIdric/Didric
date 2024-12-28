import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedFrameworkProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  metrics: Array<{
    label: string;
    value: string;
  }>;
}

export function FeaturedFramework({ id, icon, title, description, metrics }: FeaturedFrameworkProps) {
  return (
    <div className="bg-black/30 rounded-lg p-8 h-full">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-[#ff3b30]/10 flex items-center justify-center">
          {React.isValidElement(icon) && React.cloneElement(icon, { 
            className: "text-[#ff3b30]", 
            size: 24 
          })}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-gray-400 mt-2">{description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ff3b30]" />
            <div className="text-sm">
              <span className="text-gray-400">{metric.label}:</span>
              {' '}
              <span className="text-white">{metric.value}</span>
            </div>
          </div>
        ))}
      </div>

      <Link 
        to={`/frameworks/${id}`}
        className="flex items-center gap-2 text-[#ff3b30] hover:text-[#ff3b30]/80 transition-colors group"
      >
        Explore Framework
        <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}