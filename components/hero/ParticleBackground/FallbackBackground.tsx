import { colors } from '../../../config/colors';

export function FallbackBackground() {
  return (
    <mesh>
      <planeGeometry args={[10, 10]} />
      <meshBasicMaterial color={colors.dark[900]} />
    </mesh>
  );
}