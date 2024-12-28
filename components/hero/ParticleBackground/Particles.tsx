import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useParticleColors } from './useParticleColors';
import { useParticlePositions } from './useParticlePositions';
import { useParticleConnections } from './useParticleConnections';
import { PARTICLE_CONFIG } from './config';

export function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors } = useParticlePositions(PARTICLE_CONFIG.COUNT);
  const { connections, updateConnections } = useParticleConnections(
    PARTICLE_CONFIG.COUNT, 
    PARTICLE_CONFIG.CONNECTION_RADIUS
  );

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime() * PARTICLE_CONFIG.ANIMATION_SPEED;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Update particle positions with smooth animation
    for (let i = 0; i < PARTICLE_CONFIG.COUNT; i++) {
      const i3 = i * 3;
      positions[i3] += Math.sin(time + i) * PARTICLE_CONFIG.MOVEMENT_RANGE;
      positions[i3 + 1] += Math.cos(time + i) * PARTICLE_CONFIG.MOVEMENT_RANGE;
      positions[i3 + 2] += Math.sin(time + i) * PARTICLE_CONFIG.MOVEMENT_RANGE;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    updateConnections(positions);
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_CONFIG.COUNT}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={PARTICLE_CONFIG.COUNT}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={PARTICLE_CONFIG.SIZE}
          vertexColors
          transparent
          opacity={PARTICLE_CONFIG.OPACITY}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {connections}
    </group>
  );
}