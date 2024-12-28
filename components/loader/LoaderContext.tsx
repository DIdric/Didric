import { createContext, useContext, useState, useEffect } from 'react';

interface LoaderContextType {
  isLoading: boolean;
}

const LoaderContext = createContext<LoaderContextType>({ isLoading: true });

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Shorter loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoaderContext.Provider value={{ isLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);