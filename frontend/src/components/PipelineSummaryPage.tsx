import { useState } from 'react';
import { ColumnDef } from '../types';
import { useLoansQuery } from '../hooks/useLoansQuery';
import { useProcessorsQuery } from '../hooks/useProcessorsQuery';
import { useAssignLoansMutation } from '../hooks/useAssignLoansMutation';
import { PageTitle } from './PageTitle';
import { StatusTabs } from './StatusTabs';
import { KPIChips } from './KPIChips';
import { CustomizeColumnsDropdown } from './CustomizeColumnsDropdown';
import { AssignLoansButton } from './AssignLoansButton';
import { LoansDataGrid } from './LoansDataGrid';
import { SelectionActionBar } from './SelectionActionBar';
import { AssignLoansModal } from './AssignLoansModal';

const columns: ColumnDef[] = [
  { id: 'loanNumber', label: 'Loan Number' },
  { id: 'loanStatus', label: 'Status' },
  { id: 'statusDateTime', label: 'Status Date' },
  { id: 'loanTypePurpose', label: 'Type/Purpose' },
  { id: 'sellerName', label: 'Seller' },
  { id: 'xpressType', label: 'Xpress Type' },
  { id: 'borrowerCount', label: 'Borrowers' },
  { id: 'mortgageProgramType', label: 'Program' },
  { id: 'assignedTo', label: 'Assigned To' },
  { id: 'assignedDateTime', label: 'Assigned Date' },
  { id: 'groupAssignedTo', label: 'Group' },
  { id: 'sla', label: 'SLA' }
];

export function PipelineSummaryPage() {
  const [tab, setTab] = useState('Unassigned');
  const loans = useLoansQuery(tab);
  const [visible, setVisible] = useState(columns.map((c) => c.id));
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const processors = useProcessorsQuery('');
  const assign = useAssignLoansMutation();

  const handleAssign = async (processorId: string) => {
    await assign(Array.from(selected), processorId);
    setSelected(new Set());
    setModalOpen(false);
  };

  return (
    <div>
      <PageTitle>Pipeline Summary</PageTitle>
      <StatusTabs value={tab} onChange={setTab} />
      <KPIChips
        items={[
          { label: 'Total Loans', value: loans.length },
          { label: 'Unassigned Loans', value: loans.filter((l) => !l.assignedTo).length }
        ]}
      />
      <CustomizeColumnsDropdown columns={columns} visibleColumnIds={visible} onChange={setVisible} />
      <AssignLoansButton disabled={selected.size === 0} onClick={() => setModalOpen(true)} />
      <LoansDataGrid
        rows={loans}
        columns={columns}
        visibleColumnIds={visible}
        selectedRowIds={selected}
        onSelectionChange={setSelected}
      />
      <SelectionActionBar
        count={selected.size}
        onCancel={() => setSelected(new Set())}
        onAssign={() => setModalOpen(true)}
      />
      <AssignLoansModal
        open={modalOpen}
        selectedLoanIds={Array.from(selected)}
        processors={processors}
        onClose={() => setModalOpen(false)}
        onConfirm={handleAssign}
      />
    </div>
  );
}
