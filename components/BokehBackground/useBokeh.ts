import { useCallback, useEffect, useRef } from 'react';
import { Bokeh } from './Bokeh';

export function useBokeh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bokehsRef = useRef<Bokeh[]>([]);
  const animationFrameRef = useRef<number>();

  const initBokehs = useCallback(() => {
    if (!canvasRef.current) return;
    const { width, height } = canvasRef.current;
    const bokehs: Bokeh[] = [];
    
    // Increased density of bokeh elements
    const count = Math.floor((width * height) / 30000);
    
    for (let i = 0; i < count; i++) {
      bokehs.push(
        new Bokeh(
          Math.random() * width,
          Math.random() * height
        )
      );
    }
    
    bokehsRef.current = bokehs;
  }, []);

  const animate = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    bokehsRef.current.forEach(bokeh => {
      bokeh.update(canvas.width, canvas.height);
      bokeh.draw(ctx);
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    // Set to device pixel ratio for sharper rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    
    initBokehs();
  }, [initBokehs]);

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