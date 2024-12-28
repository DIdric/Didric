import { useBokeh } from './useBokeh';

export default function BokehBackground() {
  const { canvasRef } = useBokeh();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-dark-900" />
      
      {/* Bokeh effect */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/0 via-dark-900/50 to-dark-900" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-dark-900/30 to-dark-900" />
    </div>
  );
}