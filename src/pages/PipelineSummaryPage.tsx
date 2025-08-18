import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PageTitle } from '../components/PageTitle';
import { StatusTabs } from '../components/StatusTabs';
import { KPIChips } from '../components/KPIChips';
import { CustomizeColumnsDropdown } from '../components/CustomizeColumnsDropdown';
import { AssignLoansButton } from '../components/AssignLoansButton';
import { LoansDataGrid } from '../components/DataGrid/LoansDataGrid';
import { AssignLoansModal } from '../components/AssignLoansModal/AssignLoansModal';
import { ToastProvider, useToast } from '../components/ToastHost';
import { useLoansQuery, useKpisQuery } from '../hooks/useLoansQuery';
import { useProcessorsQuery } from '../hooks/useProcessorsQuery';
import { useAssignLoansMutation } from '../hooks/useAssignLoansMutation';
import { useColumnVisibilityManager } from '../hooks/useColumnVisibilityManager';
import { LOAN_COLUMNS } from '../constants/columns';
import { SortState, FilterState, KpiItem } from '../types/types';
import { canAssignLoans } from '../utils/validators';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const PipelineSummaryPageContent: React.FC = () => {
  const [statusTab, setStatusTab] = useState('unassigned');
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [sort, setSort] = useState<SortState>();
  const [filters, setFilters] = useState<FilterState>({});

  const { visibleColumnIds, setVisibleColumnIds } = useColumnVisibilityManager(LOAN_COLUMNS);
  const { showToast } = useToast();

  const { data: loans = [], isLoading: loansLoading, error: loansError } = useLoansQuery(statusTab);
  const { data: kpis = {}, isLoading: kpisLoading } = useKpisQuery();
  const { data: processors = [], isLoading: processorsLoading } = useProcessorsQuery();
  
  const assignMutation = useAssignLoansMutation();

  const kpiItems: KpiItem[] = Object.entries(kpis).map(([label, value]) => ({
    label,
    value,
  }));

  const handleAssignClick = () => {
    if (canAssignLoans(selectedRowIds)) {
      setIsAssignModalOpen(true);
    }
  };

  const handleAssignConfirm = async (processorId: string) => {
    const selectedIds = Array.from(selectedRowIds);
    
    try {
      await assignMutation.mutateAsync({
        loanIds: selectedIds,
        processorId,
      });
      
      const selectedProcessor = processors.find(p => p.id === processorId);
      showToast(
        `Loans assigned to ${selectedProcessor?.name || 'processor'}`,
        'success'
      );
      
      setSelectedRowIds(new Set());
      setIsAssignModalOpen(false);
    } catch (error) {
      showToast('Failed to assign loans', 'error');
    }
  };

  const handleAssignCancel = () => {
    setIsAssignModalOpen(false);
  };

  if (loansError) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Failed to load loans</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageTitle title="Pipeline Summary" />
      
      <StatusTabs value={statusTab} onChange={setStatusTab} />
      
      {!kpisLoading && <KPIChips items={kpiItems} />}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <CustomizeColumnsDropdown
            columns={LOAN_COLUMNS}
            visibleColumnIds={visibleColumnIds}
            onChange={setVisibleColumnIds}
          />
        </div>
        
        <AssignLoansButton
          disabled={!canAssignLoans(selectedRowIds)}
          onClick={handleAssignClick}
        />
      </div>
      
      <LoansDataGrid
        rows={loans}
        columns={LOAN_COLUMNS}
        visibleColumnIds={visibleColumnIds}
        sort={sort}
        filters={filters}
        selectedRowIds={selectedRowIds}
        loading={loansLoading}
        onSortChange={setSort}
        onFilterChange={setFilters}
        onSelectionChange={setSelectedRowIds}
        onAssignClick={handleAssignClick}
      />
      
      <AssignLoansModal
        open={isAssignModalOpen}
        selectedLoanIds={Array.from(selectedRowIds)}
        processors={processors}
        loading={assignMutation.isPending || processorsLoading}
        onClose={handleAssignCancel}
        onConfirm={handleAssignConfirm}
      />
    </div>
  );
};

export const PipelineSummaryPage: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <PipelineSummaryPageContent />
      </ToastProvider>
    </QueryClientProvider>
  );
};