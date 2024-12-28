import { HeroContent } from './HeroContent';
import ParticleBackground from './ParticleBackground';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20">
      <ParticleBackground />
      <div className="relative z-10 w-full">
        <HeroContent />
      </div>
    </section>
  );
}