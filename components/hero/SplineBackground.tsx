import { useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineBackground() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleSplineLoad = () => {
    setIsLoading(false);
  };

  const handleSplineError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Loading state with animated gradient
  const loadingBackground = (
    <div className="absolute inset-0 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/50 to-dark-900" />
      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
        Loading 3D Scene...
      </div>
    </div>
  );

  // Fallback gradient background
  const fallbackBackground = (
    <>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/50 to-dark-900" />
      
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
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
    </>
  );

  return (
    <div className="absolute inset-0 -z-10">
      {/* Show loading state while Spline is initializing */}
      {isLoading && loadingBackground}

      {/* Show fallback if error occurs */}
      {hasError ? (
        fallbackBackground
      ) : (
        <>
          <Spline 
            scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
            onLoad={handleSplineLoad}
            onError={handleSplineError}
            className="w-full h-full"
          />
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-900" />
        </>
      )}
    </div>
  );
}