import React from 'react';
import { ColumnDef, SortState } from '../../types/types';
import { GridHeaderCell } from './GridHeaderCell';

interface GridHeaderProps {
  columns: ColumnDef[];
  sort?: SortState;
  isAllSelected: boolean;
  isSomeSelected: boolean;
  onSortChange?: (sort: SortState) => void;
  onSelectAll: () => void;
}

export const GridHeader: React.FC<GridHeaderProps> = ({
  columns,
  sort,
  isAllSelected,
  isSomeSelected,
  onSortChange,
  onSelectAll,
}) => {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="w-12 px-4 py-3">
          <input
            type="checkbox"
            checked={isAllSelected}
            ref={(input) => {
              if (input) {
                input.indeterminate = isSomeSelected;
              }
            }}
            onChange={onSelectAll}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </th>
        {columns.map((column) => (
          <GridHeaderCell
            key={column.id}
            column={column}
            sort={sort}
            onSortChange={onSortChange}
          />
        ))}
      </tr>
    </thead>
  );
};