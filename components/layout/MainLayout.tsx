import React from 'react';
import Navigation from '../Navigation';
import { Background } from './Background';
import { useScrollToHash } from '../../hooks/useScrollToHash';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  useScrollToHash();

  return (
    <div className="relative min-h-screen bg-dark-900 text-white overflow-x-hidden">
      <Background />
      <Navigation />
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}