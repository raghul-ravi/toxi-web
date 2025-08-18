import React from 'react';

interface SelectedLoansListProps {
  loanIds: string[];
}

export const SelectedLoansList: React.FC<SelectedLoansListProps> = ({ loanIds }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-900">
          Selected Loans ({loanIds.length})
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          {loanIds.map((loanId, index) => (
            <div key={loanId} className="py-2 text-sm text-gray-700">
              {loanId}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};