import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToHash() {
  const location = useLocation();

  const scrollToElement = useCallback((hash: string) => {
    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
      // Add a small delay to ensure the DOM is ready
      setTimeout(() => {
        scrollToElement(location.hash);
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, scrollToElement]);
}