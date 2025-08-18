import React from 'react';
import { ChevronUp, ChevronDown, Filter } from 'lucide-react';
import { ColumnDef, SortState } from '../../types/types';

interface GridHeaderCellProps {
  column: ColumnDef;
  sort?: SortState;
  onSortChange?: (sort: SortState) => void;
}

export const GridHeaderCell: React.FC<GridHeaderCellProps> = ({
  column,
  sort,
  onSortChange,
}) => {
  const handleSort = () => {
    if (!onSortChange || !column.sortable) return;

    const newDirection = 
      sort?.columnId === column.id && sort.direction === 'asc' ? 'desc' : 'asc';
    
    onSortChange({ columnId: column.id, direction: newDirection });
  };

  const getSortIcon = () => {
    if (sort?.columnId !== column.id) return null;
    return sort.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <th className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.width ? `w-${column.width}` : ''}`}>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleSort}
          className={`flex items-center space-x-1 ${
            column.sortable ? 'hover:text-gray-700 cursor-pointer' : 'cursor-default'
          }`}
        >
          <span>{column.label}</span>
          {column.sortable && getSortIcon()}
        </button>
        {column.filterable && (
          <button className="text-gray-400 hover:text-gray-600">
            <Filter className="w-4 h-4" />
          </button>
        )}
      </div>
    </th>
  );
};