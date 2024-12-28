import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useParticleColors } from './useParticleColors';

export function useParticleConnections(count: number, radius: number) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const { colors } = useParticleColors();

  const connections = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * count * 6);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    return (
      <lineSegments ref={lineRef}>
        <primitive object={geometry} />
        <lineBasicMaterial
          color={colors[0]}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    );
  }, [count, colors]);

  const updateConnections = (particlePositions: Float32Array) => {
    if (!lineRef.current) return;

    const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
    let vertexIndex = 0;

    // Reset positions
    positions.fill(0);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      for (let j = i + 1; j < count; j++) {
        const j3 = j * 3;
        const dx = particlePositions[i3] - particlePositions[j3];
        const dy = particlePositions[i3 + 1] - particlePositions[j3 + 1];
        const dz = particlePositions[i3 + 2] - particlePositions[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < radius) {
          // First vertex
          positions[vertexIndex++] = particlePositions[i3];
          positions[vertexIndex++] = particlePositions[i3 + 1];
          positions[vertexIndex++] = particlePositions[i3 + 2];
          // Second vertex
          positions[vertexIndex++] = particlePositions[j3];
          positions[vertexIndex++] = particlePositions[j3 + 1];
          positions[vertexIndex++] = particlePositions[j3 + 2];
        }
      }
    }

    lineRef.current.geometry.attributes.position.needsUpdate = true;
  };

  return { connections, updateConnections };
}