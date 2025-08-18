import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { loansApi } from '../services/api';

import type { ColumnDef } from '../types/types';

interface EnhancedLoansGridProps {
  statusTab: string;
  onAssignClick: (selectedLoanIds: string[]) => void;
  columns: ColumnDef[];
  visibleColumnIds: string[];
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  columnId: string | null;
  direction: SortDirection;
}

export const EnhancedLoansGrid = ({ statusTab, onAssignClick, columns, visibleColumnIds }: EnhancedLoansGridProps) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortState, setSortState] = useState<SortState>({ columnId: null, direction: null });
  
  const { data: rawLoans = [], isLoading, error } = useQuery({
    queryKey: ['loans', statusTab],
    queryFn: () => loansApi.getLoans(statusTab),
    staleTime: 30000,
  });

  const sortedLoans = [...rawLoans].sort((a, b) => {
    if (!sortState.columnId || !sortState.direction) return 0;
    
    const getValue = (loan: any, columnId: string) => {
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
        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      );
    }
    
    if (sortState.direction === 'asc') {
      return (
        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    } else if (sortState.direction === 'desc') {
      return (
        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    }
    
    return null;
  };

  const renderCellValue = (loan: any, columnId: string) => {
    switch (columnId) {
      case 'loanNumber':
        return loan.loanNumber;
      case 'loanStatus':
        return loan.loanStatus;
      case 'statusDateTime':
        return `${new Date(loan.statusDateTime).toLocaleDateString()} ${new Date(loan.statusDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
      case 'loanTypePurpose':
        return loan.loanTypePurpose;
      case 'sellerName':
        return loan.sellerName;
      case 'xpressType':
        return loan.xpressType;
      case 'borrowerCount':
        return loan.borrowerCount;
      case 'mortgageProgramType':
        return loan.mortgageProgramType;
      case 'assignedTo':
        return loan.assignedTo || <span className="text-gray-400">-</span>;
      case 'assignedDateTime':
        return loan.assignedDateTime ? (
          `${new Date(loan.assignedDateTime).toLocaleDateString()} ${new Date(loan.assignedDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
        ) : (
          <span className="text-gray-400">-</span>
        );
      case 'groupAssignedTo':
        return loan.groupAssignedTo || <span className="text-gray-400">-</span>;
      case 'sla':
        return loan.sla || <span className="text-gray-400">-</span>;
      default:
        return '';
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.size === loans.length && loans.length > 0) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(loans.map(loan => loan.id)));
    }
  };

  const handleRowSelect = (loanId: string) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(loanId)) {
      newSelection.delete(loanId);
    } else {
      newSelection.add(loanId);
    }
    setSelectedRows(newSelection);
  };

  const isAllSelected = loans.length > 0 && selectedRows.size === loans.length;
  const isSomeSelected = selectedRows.size > 0 && selectedRows.size < loans.length;

  const visibleColumns = columns.filter(col => visibleColumnIds.includes(col.id));

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="animate-pulse">Loading loans...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-red-600 mb-4">Error loading loans</div>
        <div className="text-sm text-gray-500">
          Make sure the backend API is running on http://localhost:5139
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1 flex flex-col min-h-0">
      {/* Selection Action Bar */}
      {selectedRows.size > 0 && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.size} Loan{selectedRows.size !== 1 ? 's' : ''} Selected
            </span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedRows(new Set())}
                className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => onAssignClick(Array.from(selectedRows))}
                className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                ASSIGN LOANS
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto flex-1 min-h-0">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 px-4 py-3">
                <input 
                  type="checkbox" 
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isSomeSelected;
                  }}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                />
              </th>
              {visibleColumns.map((column) => (
                <th key={column.id} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.id)}
                      className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                    >
                      <span>{column.label}</span>
                      {getSortIcon(column.id)}
                    </button>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr 
                key={loan.id} 
                className={`border-b border-gray-200 hover:bg-gray-50 ${
                  selectedRows.has(loan.id) ? 'bg-blue-50' : ''
                }`}
              >
                <td className="w-12 px-4 py-3">
                  <input 
                    type="checkbox" 
                    checked={selectedRows.has(loan.id)}
                    onChange={() => handleRowSelect(loan.id)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                  />
                </td>
                {visibleColumns.map((column) => (
                  <td key={column.id} className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {renderCellValue(loan, column.id)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {loans.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No loans found for {statusTab} status
        </div>
      )}
    </div>
  );
};