import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface CaseStudyLayoutProps {
  children: React.ReactNode;
}

export function CaseStudyLayout({ children }: CaseStudyLayoutProps) {
  const navigate = useNavigate();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/projects');
  };

  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="max-w-4xl mx-auto px-4 py-24">
        <nav className="mb-12">
          <a 
            href="/projects"
            onClick={handleBack}
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </a>
        </nav>
        
        {children}
      </div>
    </div>
  );
}