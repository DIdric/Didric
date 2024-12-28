import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuth } from './useAuth';
import { 
  getFrameworks,
  createFramework,
  updateFramework,
  updateFrameworkOrder,
  type Framework,
  FrameworkError
} from '../lib/api/frameworks';

export function useFrameworks() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const userId = session?.user?.id;

  const { data: frameworks, isLoading, error } = useQuery<Framework[], FrameworkError>(
    'frameworks',
    getFrameworks,
    {
      staleTime: 30000,
      retry: false
    }
  );

  const createFrameworkMutation = useMutation<
    Framework,
    FrameworkError,
    Omit<Framework, 'id' | 'created_at' | 'updated_at' | 'user_id'>
  >(
    async (newFramework) => {
      if (!userId) throw new FrameworkError('You must be logged in to create frameworks');
      return createFramework(userId, newFramework);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('frameworks');
      },
    }
  );

  const updateFrameworkMutation = useMutation<
    Framework,
    FrameworkError,
    { id: string } & Partial<Omit<Framework, 'id' | 'created_at' | 'updated_at' | 'user_id'>>
  >(
    async ({ id, ...updates }) => {
      if (!userId) throw new FrameworkError('You must be logged in to update frameworks');
      return updateFramework(userId, id, updates);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('frameworks');
      },
    }
  );

  const updateOrderMutation = useMutation<
    void,
    FrameworkError,
    { id: string; newIndex: number }
  >(
    async ({ id, newIndex }) => {
      if (!userId) throw new FrameworkError('You must be logged in to reorder frameworks');
      return updateFrameworkOrder(userId, id, newIndex);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('frameworks');
      },
    }
  );

  return {
    frameworks: frameworks || [],
    isLoading,
    error,
    createFramework: createFrameworkMutation,
    updateFramework: updateFrameworkMutation,
    updateOrder: updateOrderMutation
  };
}