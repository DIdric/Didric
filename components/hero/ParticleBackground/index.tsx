import { Canvas } from '@react-three/fiber';
import { Particles } from './Particles';
import { Suspense } from 'react';
import { FallbackBackground } from './FallbackBackground';

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Base background */}
      <div className="absolute inset-0 bg-dark-900" />
      
      {/* Three.js canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]} // Optimize for retina displays
        style={{ position: 'absolute' }}
      >
        <Suspense fallback={<FallbackBackground />}>
          <Particles />
        </Suspense>
      </Canvas>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-900 pointer-events-none" />
    </div>
  );
}