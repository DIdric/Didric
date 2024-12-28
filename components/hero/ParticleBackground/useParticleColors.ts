import { useMemo } from 'react';
import * as THREE from 'three';
import { colors } from '../../../config/colors';

export function useParticleColors() {
  return useMemo(() => {
    const accentColors = Object.values(colors.accent);
    const colorInstances = accentColors.map(color => new THREE.Color(color));
    
    return {
      getRandomColor: () => {
        return colorInstances[Math.floor(Math.random() * colorInstances.length)];
      },
      colors: colorInstances
    };
  }, []);
}