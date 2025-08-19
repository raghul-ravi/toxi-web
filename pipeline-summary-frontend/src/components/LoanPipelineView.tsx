import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PipelineViewTitle } from './PipelineViewTitle';
import { StatusTabs } from './StatusTabs';
import { LoansGrid } from './LoansGrid';
import { UserAssignModal } from './UserAssignModal';
import { CustomizeColumns } from './CustomizeColumns';
import { ToastProvider } from './ToastHost';
import { useToast } from '../hooks/useToast';
import { useAssignLoansMutation } from '../hooks/useAssignLoansMutation';
import { useProcessorsQuery } from '../hooks/useProcessorsQuery';
import { useColumnVisibilityManager } from '../hooks/useColumnVisibilityManager';
import { LOAN_COLUMNS } from '../constants/columns';
import '../styles/components/LoanPipelineView.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const LoanPipelineViewContent = () => {
  const [statusTab, setStatusTab] = useState('unassigned');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedLoanIds, setSelectedLoanIds] = useState<string[]>([]);

  const { showToast } = useToast();
  const assignMutation = useAssignLoansMutation();
  const { visibleColumnIds, setVisibleColumnIds } = useColumnVisibilityManager(LOAN_COLUMNS);

  const { data: processors = [] } = useProcessorsQuery();

  const hasSelectedLoans = selectedLoanIds.length > 0;

  const handleAssignClick = (loanIds: string[]) => {
    setSelectedLoanIds(loanIds);
    setIsAssignModalOpen(true);
  };

  const handleAssignConfirm = async (processorId: string) => {
    try {
      await assignMutation.mutateAsync({
        loanIds: selectedLoanIds,
        processorId,
      });
      
      const selectedProcessor = processors.find(p => p.id === processorId);
      showToast(
        `${selectedLoanIds.length} loan${selectedLoanIds.length !== 1 ? 's' : ''} assigned to ${selectedProcessor?.name || 'processor'}`,
        'success'
      );
      
      setIsAssignModalOpen(false);
      setSelectedLoanIds([]);
    } catch {
      showToast('Failed to assign loans', 'error');
    }
  };

  const handleModalClose = () => {
    setIsAssignModalOpen(false);
    setSelectedLoanIds([]);
  };

  const handleCancelSelection = () => {
    setSelectedLoanIds([]);
  };

  return (
    <div className="loan-pipeline-container">
      <PipelineViewTitle title="Pipeline Summary" />
      
      <div className="loan-pipeline-controls">
        <StatusTabs value={statusTab} onChange={setStatusTab} />
        <div className="loan-pipeline-controls-right">
          {hasSelectedLoans ? (
            <div className="loan-pipeline-selection-actions">
              <button
                onClick={handleCancelSelection}
                className="loan-pipeline-cancel-button"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleAssignClick(selectedLoanIds)}
                className="loan-pipeline-assign-button"
              >
                ASSIGN LOANS
              </button>
            </div>
          ) : (
            <CustomizeColumns
              columns={LOAN_COLUMNS}
              visibleColumnIds={visibleColumnIds}
              onChange={setVisibleColumnIds}
            />
          )}
        </div>
      </div>
      
      <div className="loan-pipeline-selection-label-container">
        {hasSelectedLoans && (
          <div className="loan-pipeline-selection-label">
            {selectedLoanIds.length} Loan{selectedLoanIds.length !== 1 ? 's' : ''} Selected
          </div>
        )}
      </div>
      
      <div className="loan-pipeline-grid-section">
        <LoansGrid 
          statusTab={statusTab} 
          onAssignClick={setSelectedLoanIds}
          columns={LOAN_COLUMNS}
          visibleColumnIds={visibleColumnIds}
          selectedLoanIds={selectedLoanIds}
          onSelectionChange={setSelectedLoanIds}
        />
      </div>

      <UserAssignModal
        isOpen={isAssignModalOpen}
        selectedLoanIds={selectedLoanIds}
        onClose={handleModalClose}
        onAssign={handleAssignConfirm}
        isAssigning={assignMutation.isPending}
      />
    </div>
  );
};

export const LoanPipelineView = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <LoanPipelineViewContent />
      </ToastProvider>
    </QueryClientProvider>
  );
};