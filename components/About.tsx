import React from 'react';
import { FileDown } from 'lucide-react';
import { Button } from './ui/Button';

export default function About() {
  return (
    <section id="about" className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 bg-gradient-accent bg-clip-text text-transparent">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-accent-blue">Design Philosophy</h3>
            <p className="text-gray-300 leading-relaxed">
              I believe in creating digital experiences that seamlessly blend form and function. Every pixel has a purpose, 
              and every interaction should feel natural and intuitive. My approach combines minimalist design principles 
              with thoughtful functionality, ensuring that each project not only looks beautiful but also delivers real value 
              to its users.
            </p>
            <p className="text-gray-300 leading-relaxed">
              With a strong foundation in both front-end and back-end development, I strive to build solutions that are 
              not just visually striking, but also performant, accessible, and maintainable.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center space-y-6 bg-dark-800/50 backdrop-blur-sm p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-accent-blue">My Resume</h3>
            <p className="text-gray-300 text-center">
              Download my resume to learn more about my experience and skills.
            </p>
            <Button>
              <FileDown className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}