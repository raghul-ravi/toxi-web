import { useQuery } from '@tanstack/react-query';
import { loansApi } from '../services/api';
import { Loan } from '../types/types';

export const useLoansQuery = (statusTab: string) => {
  return useQuery<Loan[]>({
    queryKey: ['loans', statusTab],
    queryFn: () => loansApi.getLoans(statusTab),
    staleTime: 30000, // 30 seconds
  });
};

export const useKpisQuery = () => {
  return useQuery<Record<string, number>>({
    queryKey: ['kpis'],
    queryFn: loansApi.getKpis,
    staleTime: 60000, // 1 minute
  });
};