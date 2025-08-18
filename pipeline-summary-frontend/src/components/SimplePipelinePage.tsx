import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { Home, Users } from 'lucide-react';
import { PageTitle } from './PageTitle';
import { StatusTabs } from './StatusTabs';
import { EnhancedLoansGrid } from './EnhancedLoansGrid';
import { SimpleAssignModal } from './SimpleAssignModal';
import { FunctionalCustomizeColumns } from './FunctionalCustomizeColumns';
import { ToastProvider, useToast } from './ToastHost';
import { loansApi } from '../services/api';
import { useAssignLoansMutation } from '../hooks/useAssignLoansMutation';
import { useProcessorsQuery } from '../hooks/useProcessorsQuery';
import { useColumnVisibilityManager } from '../hooks/useColumnVisibilityManager';
import { LOAN_COLUMNS } from '../constants/columns';
import type { KpiItem } from '../types/types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const SimplePipelinePageContent = () => {
  const [statusTab, setStatusTab] = useState('unassigned');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedLoanIds, setSelectedLoanIds] = useState<string[]>([]);

  const { showToast } = useToast();
  const assignMutation = useAssignLoansMutation();
  const { visibleColumnIds, setVisibleColumnIds } = useColumnVisibilityManager(LOAN_COLUMNS);

  const { data: kpis = {} } = useQuery({
    queryKey: ['kpis'],
    queryFn: loansApi.getKpis,
    staleTime: 60000,
  });

  const { data: processors = [] } = useProcessorsQuery();

  const kpiItems: KpiItem[] = Object.entries(kpis).map(([label, value]) => ({
    label,
    value,
  }));

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
    } catch (error) {
      showToast('Failed to assign loans', 'error');
    }
  };

  const handleModalClose = () => {
    setIsAssignModalOpen(false);
    setSelectedLoanIds([]);
  };

  return (
    <div className="h-full w-full flex flex-col space-y-6">
      <PageTitle title="Pipeline Summary" />
      
      <StatusTabs value={statusTab} onChange={setStatusTab} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* KPI Chips */}
          {kpiItems.length > 0 && (
            <>
              {kpiItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md"
                >
                  {item.label.toLowerCase().includes('total') ? (
                    <Home className="w-4 h-4 text-gray-600" />
                  ) : (
                    <Users className="w-4 h-4 text-gray-600" />
                  )}
                  <span className="font-medium text-gray-900">{item.value}</span>
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
              ))}
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <FunctionalCustomizeColumns
            columns={LOAN_COLUMNS}
            visibleColumnIds={visibleColumnIds}
            onChange={setVisibleColumnIds}
          />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0">
        <EnhancedLoansGrid 
          statusTab={statusTab} 
          onAssignClick={handleAssignClick}
          columns={LOAN_COLUMNS}
          visibleColumnIds={visibleColumnIds}
        />
      </div>

      <SimpleAssignModal
        isOpen={isAssignModalOpen}
        selectedLoanIds={selectedLoanIds}
        onClose={handleModalClose}
        onAssign={handleAssignConfirm}
        isAssigning={assignMutation.isPending}
      />
    </div>
  );
};

export const SimplePipelinePage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <SimplePipelinePageContent />
      </ToastProvider>
    </QueryClientProvider>
  );
};