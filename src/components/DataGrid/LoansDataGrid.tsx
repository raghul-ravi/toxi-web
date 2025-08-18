import React from 'react';
import { Loan, ColumnDef, SortState, FilterState } from '../../types/types';
import { GridHeader } from './GridHeader';
import { GridRow } from './GridRow';
import { SelectionActionBar } from './SelectionActionBar';
import { pluralize } from '../../utils/formatters';

interface LoansDataGridProps {
  rows: Loan[];
  columns: ColumnDef[];
  visibleColumnIds: string[];
  sort?: SortState;
  filters?: FilterState;
  selectedRowIds: Set<string>;
  loading?: boolean;
  onSortChange?: (sort: SortState) => void;
  onFilterChange?: (filters: FilterState) => void;
  onSelectionChange: (selectedIds: Set<string>) => void;
  onAssignClick: () => void;
}

export const LoansDataGrid: React.FC<LoansDataGridProps> = ({
  rows,
  columns,
  visibleColumnIds,
  sort,
  filters,
  selectedRowIds,
  loading = false,
  onSortChange,
  onFilterChange,
  onSelectionChange,
  onAssignClick,
}) => {
  const visibleColumns = columns.filter(col => visibleColumnIds.includes(col.id));

  const handleSelectAll = () => {
    if (selectedRowIds.size === rows.length) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(rows.map(row => row.id)));
    }
  };

  const handleRowSelect = (rowId: string, selected: boolean) => {
    const newSelection = new Set(selectedRowIds);
    if (selected) {
      newSelection.add(rowId);
    } else {
      newSelection.delete(rowId);
    }
    onSelectionChange(newSelection);
  };

  const isAllSelected = rows.length > 0 && selectedRowIds.size === rows.length;
  const isSomeSelected = selectedRowIds.size > 0 && selectedRowIds.size < rows.length;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {selectedRowIds.size > 0 && (
        <SelectionActionBar
          count={selectedRowIds.size}
          onCancel={() => onSelectionChange(new Set())}
          onAssign={onAssignClick}
        />
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <GridHeader
            columns={visibleColumns}
            sort={sort}
            isAllSelected={isAllSelected}
            isSomeSelected={isSomeSelected}
            onSortChange={onSortChange}
            onSelectAll={handleSelectAll}
          />
          <tbody>
            {rows.map((row) => (
              <GridRow
                key={row.id}
                row={row}
                columns={visibleColumns}
                isSelected={selectedRowIds.has(row.id)}
                onSelect={(selected) => handleRowSelect(row.id, selected)}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {rows.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No loans found
        </div>
      )}
    </div>
  );
};