import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface FrameworkCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FrameworkCard({ id, icon, title, description }: FrameworkCardProps) {
  return (
    <Link 
      to={`/frameworks/${id}`}
      className="block bg-black/20 rounded-lg p-6 hover:bg-black/30 transition-colors group"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#ff3b30]/10 flex items-center justify-center">
          {React.isValidElement(icon) && React.cloneElement(icon, { 
            className: "text-[#ff3b30]", 
            size: 20 
          })}
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-white flex items-center justify-between">
            {title}
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </h4>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
}