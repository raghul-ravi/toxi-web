import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { loansApi } from '../services/api';
import '../styles/components/LoansGrid.css';

import type { ColumnDef, Loan } from '../types/types';

interface LoansGridProps {
  statusTab: string;
  onAssignClick: (selectedLoanIds: string[]) => void;
  columns: ColumnDef[];
  visibleColumnIds: string[];
  selectedLoanIds?: string[];
  onSelectionChange?: (selectedLoanIds: string[]) => void;
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  columnId: string | null;
  direction: SortDirection;
}

export const LoansGrid = ({ statusTab, onAssignClick, columns, visibleColumnIds, selectedLoanIds = [], onSelectionChange }: LoansGridProps) => {
  const selectedRows = new Set(selectedLoanIds);
  const [sortState, setSortState] = useState<SortState>({ columnId: null, direction: null });
  
  const { data: rawLoans = [], isLoading, error } = useQuery({
    queryKey: ['loans', statusTab],
    queryFn: () => loansApi.getLoans(statusTab),
    staleTime: 30000,
  });

  const sortedLoans = [...rawLoans].sort((a, b) => {
    if (!sortState.columnId || !sortState.direction) return 0;
    
    const getValue = (loan: Loan, columnId: string) => {
      switch (columnId) {
        case 'loanNumber':
          return loan.loanNumber || '';
        case 'loanStatus':
          return loan.loanStatus || '';
        case 'statusDateTime':
          return new Date(loan.statusDateTime).getTime();
        case 'loanTypePurpose':
          return loan.loanTypePurpose || '';
        case 'sellerName':
          return loan.sellerName || '';
        case 'xpressType':
          return loan.xpressType || '';
        case 'borrowerCount':
          return loan.borrowerCount || 0;
        case 'mortgageProgramType':
          return loan.mortgageProgramType || '';
        case 'assignedTo':
          return loan.assignedTo || '';
        case 'assignedDateTime':
          return loan.assignedDateTime ? new Date(loan.assignedDateTime).getTime() : 0;
        case 'groupAssignedTo':
          return loan.groupAssignedTo || '';
        case 'sla':
          return loan.sla || '';
        default:
          return '';
      }
    };

    const aValue = getValue(a, sortState.columnId);
    const bValue = getValue(b, sortState.columnId);
    
    let comparison = 0;
    if (aValue < bValue) {
      comparison = -1;
    } else if (aValue > bValue) {
      comparison = 1;
    }
    
    return sortState.direction === 'desc' ? -comparison : comparison;
  });

  const loans = sortedLoans;

  const handleSort = (columnId: string) => {
    if (sortState.columnId === columnId) {
      // Cycle through: asc -> desc -> null
      const nextDirection: SortDirection = 
        sortState.direction === 'asc' ? 'desc' : 
        sortState.direction === 'desc' ? null : 'asc';
      
      setSortState({
        columnId: nextDirection ? columnId : null,
        direction: nextDirection
      });
    } else {
      // Start with ascending
      setSortState({ columnId, direction: 'asc' });
    }
  };

  const getSortIcon = (columnId: string) => {
    if (sortState.columnId !== columnId) {
      return (
        <svg className="loans-grid-sort-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      );
    }
    
    if (sortState.direction === 'asc') {
      return (
        <svg className="loans-grid-sort-icon-active" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    } else if (sortState.direction === 'desc') {
      return (
        <svg className="loans-grid-sort-icon-active" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    }
    
    return null;
  };

  const renderCellValue = (loan: Loan, columnId: string) => {
    switch (columnId) {
      case 'loanNumber':
        return <span className="loans-grid-loan-number">{loan.loanNumber}</span>;
      case 'loanStatus':
        return <span className="loans-grid-status-not-assigned">{loan.loanStatus}</span>;
      case 'statusDateTime':
        return `${new Date(loan.statusDateTime).toLocaleDateString()} ${new Date(loan.statusDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
      case 'loanTypePurpose':
        return loan.loanTypePurpose;
      case 'sellerName':
        return loan.sellerName;
      case 'xpressType':
        return <span className={loan.xpressType === 'Express' ? 'loans-grid-xpress-express' : 'loans-grid-xpress-standard'}>{loan.xpressType}</span>;
      case 'borrowerCount':
        return <span className="loans-grid-borrower-count">{loan.borrowerCount}</span>;
      case 'mortgageProgramType':
        return <span className="loans-grid-mortgage-type">{loan.mortgageProgramType}</span>;
      case 'assignedTo':
        return loan.assignedTo || <span className="loans-grid-null-value">-</span>;
      case 'assignedDateTime':
        return loan.assignedDateTime ? (
          `${new Date(loan.assignedDateTime).toLocaleDateString()} ${new Date(loan.assignedDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
        ) : (
          <span className="loans-grid-null-value">-</span>
        );
      case 'groupAssignedTo':
        return loan.groupAssignedTo || <span className="loans-grid-null-value">-</span>;
      case 'sla':
        return loan.sla || <span className="loans-grid-null-value">-</span>;
      default:
        return '';
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.size === loans.length && loans.length > 0) {
      onSelectionChange?.([]);
    } else {
      onSelectionChange?.(loans.map(loan => loan.id));
    }
  };

  const handleRowSelect = (loanId: string) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(loanId)) {
      newSelection.delete(loanId);
    } else {
      newSelection.add(loanId);
    }
    onSelectionChange?.(Array.from(newSelection));
  };

  const isAllSelected = loans.length > 0 && selectedRows.size === loans.length;
  const isSomeSelected = selectedRows.size > 0 && selectedRows.size < loans.length;

  const visibleColumns = columns.filter(col => visibleColumnIds.includes(col.id));

  if (isLoading) {
    return (
      <div className="loans-grid-loading-container">
        <div className="loans-grid-loading-text">Loading loans...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loans-grid-error-container">
        <div className="loans-grid-error-text">Error loading loans</div>
        <div className="loans-grid-error-subtext">
          Make sure the backend API is running on http://localhost:5139
        </div>
      </div>
    );
  }

  return (
    <div className="loans-grid-container">
      <div className="loans-grid-table-container">
        <table className="loans-grid-table">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isSomeSelected;
                  }}
                  onChange={handleSelectAll}
                  className="loans-grid-checkbox" 
                />
              </th>
              {visibleColumns.map((column) => (
                <th key={column.id}>
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.id)}
                      className="loans-grid-sort-button"
                    >
                      <span>{column.label}</span>
                      {getSortIcon(column.id)}
                    </button>
                  ) : (
                    <span>{column.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr 
                key={loan.id}
              >
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedRows.has(loan.id)}
                    onChange={() => handleRowSelect(loan.id)}
                    className="loans-grid-checkbox" 
                  />
                </td>
                {visibleColumns.map((column) => (
                  <td key={column.id}>
                    {renderCellValue(loan, column.id)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {loans.length === 0 && (
        <div className="loans-grid-empty-state">
          No loans found for {statusTab} status
        </div>
      )}
    </div>
  );
};