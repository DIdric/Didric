import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuth } from './useAuth';
import { getProjects, createProject, updateProject, type Project } from '../lib/api/projects';

export function useProjects() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const userId = session?.user?.id;

  const { data: projects, isLoading } = useQuery<Project[]>(
    'projects',
    getProjects
  );

  const createProjectMutation = useMutation(
    async (newProject: Omit<Project, 'id' | 'created_at' | 'user_id'>) => {
      if (!userId) throw new Error('User must be authenticated to create projects');
      return createProject(userId, newProject);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
      },
    }
  );

  const updateProjectMutation = useMutation(
    async ({ id, ...updates }: Partial<Project> & { id: string }) => {
      if (!userId) throw new Error('User must be authenticated to update projects');
      return updateProject(userId, id, updates);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
      },
    }
  );

  return {
    projects,
    isLoading,
    createProject: createProjectMutation,
    updateProject: updateProjectMutation,
  };
}