import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useProfile } from '../../hooks/useProfile';
import Login from '../../pages/admin/Login';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { session, isLoading: authLoading } = useAuth();
  const { profile, isLoading: profileLoading } = useProfile();

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  // Profile will be automatically created if it doesn't exist
  return (
    <div className="min-h-screen bg-dark-900">
      {children}
    </div>
  );
}