import React from 'react';
import { pluralize } from '../../utils/formatters';

interface SelectionActionBarProps {
  count: number;
  onCancel: () => void;
  onAssign: () => void;
}

export const SelectionActionBar: React.FC<SelectionActionBarProps> = ({
  count,
  onCancel,
  onAssign,
}) => {
  return (
    <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-blue-900">
          {pluralize(count, 'Loan')} Selected
        </span>
        <div className="flex items-center space-x-3">
          <button
            onClick={onCancel}
            className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onAssign}
            className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            ASSIGN LOANS
          </button>
        </div>
      </div>
    </div>
  );
};