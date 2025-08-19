import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loansApi } from '../services/api';
import type { AssignLoansRequest } from '../types/types';

export const useAssignLoansMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: AssignLoansRequest) => loansApi.assignLoans(request),
    onSuccess: () => {
      // Invalidate and refetch loans
      queryClient.invalidateQueries({ queryKey: ['loans'] });
    },
  });
};