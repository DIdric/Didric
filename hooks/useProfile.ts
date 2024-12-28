import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuth } from './useAuth';
import { getProfile, createProfile, updateProfile, type Profile } from '../lib/api/profiles';

export function useProfile() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const userId = session?.user?.id;

  const { data: profile, isLoading, error } = useQuery<Profile | null>(
    ['profile', userId],
    async () => {
      if (!userId) return null;

      try {
        const profile = await getProfile(userId);
        
        // If no profile exists, create one
        if (!profile) {
          return createProfile({
            id: userId,
            email: session.user.email!,
            full_name: session.user.user_metadata?.full_name || session.user.email!.split('@')[0]
          });
        }

        return profile;
      } catch (err) {
        // Ignore PGRST116 errors as they just mean no profile exists yet
        if (err.code === 'PGRST116') {
          return null;
        }
        throw err;
      }
    },
    {
      enabled: !!userId,
      retry: false,
      staleTime: 30000 // Cache profile data for 30 seconds
    }
  );

  const updateProfileMutation = useMutation(
    async (updates: Partial<Omit<Profile, 'id' | 'created_at'>>) => {
      if (!userId) throw new Error('No user ID');
      return updateProfile(userId, updates);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profile', userId]);
      },
    }
  );

  return {
    profile,
    isLoading,
    error,
    updateProfile: updateProfileMutation
  };
}