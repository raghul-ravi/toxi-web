import { useQuery } from '@tanstack/react-query';
import { processorsApi } from '../services/api';
import { Processor } from '../types/types';

export const useProcessorsQuery = (search?: string) => {
  return useQuery<Processor[]>({
    queryKey: ['processors', search],
    queryFn: () => processorsApi.getProcessors(search),
    staleTime: 300000, // 5 minutes
    enabled: true,
  });
};