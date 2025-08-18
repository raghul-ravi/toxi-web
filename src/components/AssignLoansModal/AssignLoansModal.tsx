import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Processor } from '../../types/types';
import { SelectedLoansList } from './SelectedLoansList';
import { ProcessorPicker } from './ProcessorPicker';

interface AssignLoansModalProps {
  open: boolean;
  selectedLoanIds: string[];
  processors: Processor[];
  loading?: boolean;
  onClose: () => void;
  onConfirm: (processorId: string) => void;
}

export const AssignLoansModal: React.FC<AssignLoansModalProps> = ({
  open,
  selectedLoanIds,
  processors,
  loading = false,
  onClose,
  onConfirm,
}) => {
  const [selectedProcessorId, setSelectedProcessorId] = useState('');

  const handleConfirm = () => {
    if (selectedProcessorId) {
      onConfirm(selectedProcessorId);
    }
  };

  const handleClose = () => {
    setSelectedProcessorId('');
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Assign Loans</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-96">
          {/* Left pane - Selected Loans */}
          <div className="w-1/2 border-r border-gray-200">
            <SelectedLoansList loanIds={selectedLoanIds} />
          </div>

          {/* Right pane - Processor Picker */}
          <div className="w-1/2">
            <ProcessorPicker
              processors={processors}
              selectedProcessorId={selectedProcessorId}
              onSelect={setSelectedProcessorId}
              loading={loading}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedProcessorId || loading}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              !selectedProcessorId || loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? 'Assigning...' : 'Assign'}
          </button>
        </div>
      </div>
    </div>
  );
};