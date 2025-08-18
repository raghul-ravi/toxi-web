import { useState } from 'react';
import { X, User, Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { processorsApi } from '../services/api';
import type { Processor } from '../types/types';

interface SimpleAssignModalProps {
  isOpen: boolean;
  selectedLoanIds: string[];
  onClose: () => void;
  onAssign: (processorId: string) => void;
  isAssigning?: boolean;
}

export const SimpleAssignModal = ({
  isOpen,
  selectedLoanIds,
  onClose,
  onAssign,
  isAssigning = false,
}: SimpleAssignModalProps) => {
  const [selectedProcessorId, setSelectedProcessorId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: processors = [] } = useQuery<Processor[]>({
    queryKey: ['processors', searchTerm],
    queryFn: () => processorsApi.getProcessors(searchTerm),
    enabled: isOpen,
  });

  const filteredProcessors = processors.filter(processor =>
    processor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    processor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = () => {
    if (selectedProcessorId) {
      onAssign(selectedProcessorId);
    }
  };

  const handleClose = () => {
    setSelectedProcessorId('');
    setSearchTerm('');
    onClose();
  };

  if (!isOpen) return null;

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
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-900">
                Selected Loans ({selectedLoanIds.length})
              </h3>
            </div>
            
            <div className="overflow-y-auto h-full p-4">
              {selectedLoanIds.map((loanId) => (
                <div key={loanId} className="py-2 text-sm text-gray-700 border-b border-gray-100 last:border-b-0">
                  {loanId}
                </div>
              ))}
            </div>
          </div>

          {/* Right pane - Processor Picker */}
          <div className="w-1/2">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Select Processor
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  className="w-full pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto h-full">
              {filteredProcessors.map((processor) => (
                <button
                  key={processor.id}
                  onClick={() => setSelectedProcessorId(processor.id)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    selectedProcessorId === processor.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {processor.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {processor.email}
                        </div>
                      </div>
                    </div>
                    {selectedProcessorId === processor.id && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
              
              {filteredProcessors.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No processors found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleClose}
            disabled={isAssigning}
            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedProcessorId || isAssigning}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              !selectedProcessorId || isAssigning
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isAssigning ? 'Assigning...' : 'Assign'}
          </button>
        </div>
      </div>
    </div>
  );
};