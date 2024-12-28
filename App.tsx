import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Hero } from './components/hero/Hero';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { ProjectsSection } from './components/sections/projects/ProjectsSection';
import { ThoughtLeadershipSection } from './components/sections/thought-leadership/ThoughtLeadershipSection';
import { FeaturedCaseStudies } from './components/sections/case-studies/FeaturedCaseStudies';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  return (
    <MainLayout>
      <Hero />
      <PhilosophySection />
      <ProjectsSection />
      <FeaturedCaseStudies />
      <ThoughtLeadershipSection />
      <About />
      <Contact />
    </MainLayout>
  );
}