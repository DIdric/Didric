import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { Button } from '../ui/Button';

const PROJECTS = [
  {
    id: 1,
    title: 'Brand Evolution - Tech Startup',
    description: 'A comprehensive brand redesign for a leading tech startup, including visual identity, digital presence, and marketing materials.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    href: '#'
  },
  {
    id: 2,
    title: 'Immersive Web Experience',
    description: 'An award-winning website design featuring interactive 3D elements and seamless animations.',
    imageUrl: 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?auto=format&fit=crop&w=800&q=80',
    href: '#'
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform with a focus on user experience and conversion optimization.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    href: '#'
  }
];

export function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {PROJECTS.map((project) => (
            <div key={project.id} className="w-full flex-shrink-0 px-4">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2">
        <Button
          variant="secondary"
          onClick={prevSlide}
          className="!p-2 bg-dark-800/50 backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2">
        <Button
          variant="secondary"
          onClick={nextSlide}
          className="!p-2 bg-dark-800/50 backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {PROJECTS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-gradient-accent w-6' 
                : 'bg-dark-600 hover:bg-dark-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}