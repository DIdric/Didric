import { useParticles } from './useParticles';

export default function ParticlesBackground() {
  const { canvasRef } = useParticles();

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-dark-900" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}