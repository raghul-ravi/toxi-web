export const canAssignLoans = (selectedLoanIds: Set<string>): boolean => {
  return selectedLoanIds.size > 0;
};

export const isValidProcessorId = (processorId: string): boolean => {
  return processorId.trim().length > 0;
};

export const validateAssignRequest = (loanIds: string[], processorId: string): string[] => {
  const errors: string[] = [];

  if (loanIds.length === 0) {
    errors.push('At least one loan must be selected');
  }

  if (!isValidProcessorId(processorId)) {
    errors.push('A processor must be selected');
  }

  return errors;
};