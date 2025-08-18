import React from 'react';
import { Loan, ColumnDef } from '../../types/types';
import { formatDateTime } from '../../utils/formatters';

interface GridCellProps {
  column: ColumnDef;
  row: Loan;
}

export const GridCell: React.FC<GridCellProps> = ({ column, row }) => {
  const getValue = (): React.ReactNode => {
    const value = (row as any)[column.id];
    
    if (value === null || value === undefined) {
      return <span className="text-gray-400">-</span>;
    }

    // Format datetime fields
    if (column.id.includes('DateTime') || column.id.includes('Date')) {
      return formatDateTime(value);
    }

    return value;
  };

  return (
    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
      {getValue()}
    </td>
  );
};