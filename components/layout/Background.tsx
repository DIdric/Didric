import { useEffect, useRef } from 'react';

export function Background() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const updateGradientPosition = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      container.style.setProperty('--mouse-x', `${x}%`);
      container.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', updateGradientPosition);
    return () => window.removeEventListener('mousemove', updateGradientPosition);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10">
      {/* Base background */}
      <div className="absolute inset-0 bg-dark-900" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-accent-purple/10 blur-[120px] animate-float" />
        <div className="absolute top-1/3 -right-1/4 w-[800px] h-[800px] rounded-full bg-accent-blue/10 blur-[120px] animate-float animation-delay-1000" />
        <div className="absolute -bottom-1/4 left-1/3 w-[800px] h-[800px] rounded-full bg-accent-red/10 blur-[120px] animate-float animation-delay-2000" />
      </div>

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          filter: 'contrast(320%) brightness(100%)',
        }}
      />
    </div>
  );
}