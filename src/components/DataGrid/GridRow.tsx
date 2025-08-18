import React from 'react';
import { Loan, ColumnDef } from '../../types/types';
import { GridCell } from './GridCell';

interface GridRowProps {
  row: Loan;
  columns: ColumnDef[];
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
}

export const GridRow: React.FC<GridRowProps> = ({ row, columns, isSelected, onSelect }) => {
  return (
    <tr className={`border-b border-gray-200 hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}>
      <td className="w-12 px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </td>
      {columns.map((column) => (
        <GridCell key={column.id} column={column} row={row} />
      ))}
    </tr>
  );
};