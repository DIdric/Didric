import { useCallback, useEffect, useRef } from 'react';
import { Particle } from './Particle';
import { colors } from '../../config/colors';

export function useParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  const initParticles = useCallback(() => {
    if (!canvasRef.current) return;
    const { width, height } = canvasRef.current;
    const particles: Particle[] = [];
    
    // More particles for a denser effect
    const particleCount = Math.floor((width * height) / 15000);
    
    const particleColors = [
      colors.accent.red,
      colors.accent.cyan,
      colors.accent.purple,
      colors.accent.blue
    ];

    for (let i = 0; i < particleCount; i++) {
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      particles.push(
        new Particle(
          Math.random() * width,
          Math.random() * height,
          Math.random() * 2 + 0.5,
          color
        )
      );
    }
    particlesRef.current = particles;
  }, []);

  const drawConnections = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    const maxDistance = 150;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].pos.x - particles[j].pos.x;
        const dy = particles[i].pos.y - particles[j].pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.2;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].pos.x, particles[i].pos.y);
          ctx.lineTo(particles[j].pos.x, particles[j].pos.y);
          ctx.stroke();
        }
      }
    }
  }, []);

  const animate = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesRef.current.forEach(particle => {
      particle.update(canvas.width, canvas.height);
      particle.draw(ctx);
    });

    drawConnections(ctx, particlesRef.current);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [drawConnections]);

  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, handleResize]);

  return { canvasRef };
}