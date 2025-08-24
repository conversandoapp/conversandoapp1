import { useQuery } from '@tanstack/react-query';
import { ReflectionQuestion } from '@shared/schema';

export function useQuestions() {
  return useQuery<ReflectionQuestion[]>({
    queryKey: ['/api/questions'],
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}