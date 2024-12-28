import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuth } from './useAuth';
import { 
  getCaseStudies, 
  getCaseStudy,
  createCaseStudy, 
  updateCaseStudy,
  type CaseStudy,
  CaseStudyError
} from '../lib/api/case-studies';

export function useCaseStudies() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const userId = session?.user?.id;

  const { data: caseStudies, isLoading, error } = useQuery<CaseStudy[], CaseStudyError>(
    'case-studies',
    getCaseStudies,
    {
      staleTime: 30000,
      retry: false,
      onError: (err) => {
        console.error('Failed to fetch case studies:', err);
      }
    }
  );

  const createCaseStudyMutation = useMutation<
    CaseStudy,
    CaseStudyError,
    Omit<CaseStudy, 'id' | 'created_at' | 'updated_at' | 'user_id'>
  >(
    async (newCaseStudy) => {
      if (!userId) throw new CaseStudyError('You must be logged in to create case studies');
      const result = await createCaseStudy(userId, newCaseStudy);
      if (!result) throw new CaseStudyError('Failed to create case study');
      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('case-studies');
      },
    }
  );

  const updateCaseStudyMutation = useMutation<
    CaseStudy,
    CaseStudyError,
    { id: string } & Partial<Omit<CaseStudy, 'id' | 'created_at' | 'updated_at' | 'user_id'>>
  >(
    async ({ id, ...updates }) => {
      if (!userId) throw new CaseStudyError('You must be logged in to update case studies');
      const result = await updateCaseStudy(userId, id, updates);
      if (!result) throw new CaseStudyError('Failed to update case study');
      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('case-studies');
      },
    }
  );

  return {
    caseStudies: caseStudies || [],
    isLoading,
    error,
    createCaseStudy: createCaseStudyMutation,
    updateCaseStudy: updateCaseStudyMutation,
  };
}