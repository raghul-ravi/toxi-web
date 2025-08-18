export function useAssignLoansMutation() {
  return async (loanIds: string[], processorId: string) => {
    await fetch('/api/assign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loanIds, processorId })
    });
  };
}
