import { useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { SocialLink } from './SocialLink';
import { AnimatedText } from './AnimatedText';

export function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="px-4 max-w-7xl mx-auto w-full">
      <div className="relative max-w-2xl">
        {/* Main content */}
        <div className="mb-12">
          <AnimatedText 
            text="Hi, I'm"
            className="text-4xl md:text-6xl font-bold mb-2"
            delay={0}
          />
          <AnimatedText
            text="Didric"
            className="text-4xl md:text-6xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-6"
            delay={0.2}
          />
          <div className="overflow-hidden">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed transform translate-y-full animate-slideUp animation-delay-1000">
              A passionate creative director and visual designer crafting immersive digital experiences
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-12 opacity-0 animate-fadeIn animation-delay-1000">
          <Button href="#projects">
            View My Work
            <span className="ml-2">→</span>
          </Button>
          <Button href="#contact" variant="secondary">
            Get in Touch
          </Button>
        </div>

        {/* Social Links */}
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-6">
          <SocialLink href="https://github.com" icon={Github} />
          <SocialLink href="https://linkedin.com" icon={Linkedin} />
          <SocialLink href="https://twitter.com" icon={Twitter} />
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-32 -top-32 w-64 h-64 bg-accent-purple/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute -left-32 -bottom-32 w-64 h-64 bg-accent-blue/10 rounded-full blur-[100px] animate-pulse animation-delay-1000" />
      </div>
    </div>
  );
}