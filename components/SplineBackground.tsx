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

  // Fallback gradient background
  const fallbackBackground = "bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-900 dark:to-dark-800";

  if (hasError) {
    return <div className={`fixed inset-0 -z-10 ${fallbackBackground}`} />;
  }

  return (
    <>
      {/* Show fallback while loading */}
      {isLoading && <div className={`fixed inset-0 -z-10 ${fallbackBackground}`} />}
      
      <div className="fixed inset-0 -z-10">
        <Spline 
          scene="https://prod.spline.design/particles-22ee3a7094664e67d11df348ef7e294e/scene.splinecode"
          onLoad={handleSplineLoad}
          onError={handleSplineError}
          className="w-full h-full"
        />
      </div>
    </>
  );
}