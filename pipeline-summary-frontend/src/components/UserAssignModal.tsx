import { useState } from 'react';
import { X, User, Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { processorsApi, loansApi } from '../services/api';
import type { Processor, Loan } from '../types/types';
import '../styles/components/UserAssignModal.css';

interface UserAssignModalProps {
  isOpen: boolean;
  selectedLoanIds: string[];
  onClose: () => void;
  onAssign: (processorId: string) => void;
  isAssigning?: boolean;
}

export const UserAssignModal = ({
  isOpen,
  selectedLoanIds,
  onClose,
  onAssign,
  isAssigning = false,
}: UserAssignModalProps) => {
  const [selectedProcessorId, setSelectedProcessorId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: processors = [] } = useQuery<Processor[]>({
    queryKey: ['processors', searchTerm],
    queryFn: () => processorsApi.getProcessors(searchTerm),
    enabled: isOpen,
  });

  const { data: loans = [] } = useQuery<Loan[]>({
    queryKey: ['loans', 'all'],
    queryFn: () => loansApi.getLoans('all'),
    enabled: isOpen && selectedLoanIds.length > 0,
  });

  const selectedLoans = loans.filter(loan => selectedLoanIds.includes(loan.id));

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
    <div className="user-assign-modal-overlay">
      <div className="user-assign-modal">
        {/* Header */}
        <div className="user-assign-modal-header">
          <h2 className="user-assign-modal-header-title">Assign Loans</h2>
          <button
            onClick={handleClose}
            className="user-assign-modal-close-button"
          >
            <X className="user-assign-modal-close-icon" />
          </button>
        </div>

        {/* Content */}
        <div className="user-assign-modal-content">
          {/* Left pane - Selected Loans */}
          <div className="user-assign-modal-left-pane">
            <div className="user-assign-modal-pane-header">
              <h3 className="user-assign-modal-pane-title">
                Selected Loans ({selectedLoanIds.length})
              </h3>
            </div>
            
            <div className="user-assign-modal-loans-list">
              {selectedLoans.map((loan) => (
                <div key={loan.id} className="user-assign-modal-loan-item">
                  {loan.loanNumber}
                </div>
              ))}
            </div>
          </div>

          {/* Right pane - Processor Picker */}
          <div className="user-assign-modal-right-pane">
            <div className="user-assign-modal-pane-header">
              <h3 className="user-assign-modal-pane-subtitle">
                Select Processor
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  className="user-assign-modal-search-input"
                />
              </div>
            </div>
            
            <div className="user-assign-modal-scrollable-content-no-padding">
              {filteredProcessors.map((processor) => (
                <button
                  key={processor.id}
                  onClick={() => setSelectedProcessorId(processor.id)}
                  className={`user-assign-modal-processor-button ${
                    selectedProcessorId === processor.id ? 'user-assign-modal-selected-processor' : ''
                  }`}
                >
                  <div className="user-assign-modal-processor-content">
                    <div className="user-assign-modal-processor-info">
                      <div className="user-assign-modal-processor-avatar">
                        <User className="user-assign-modal-processor-avatar-icon" />
                      </div>
                      <div>
                        <div className="user-assign-modal-processor-name">
                          {processor.name}
                        </div>
                        <div className="user-assign-modal-processor-email">
                          {processor.email}
                        </div>
                      </div>
                    </div>
                    {selectedProcessorId === processor.id && (
                      <Check className="user-assign-modal-check-icon" />
                    )}
                  </div>
                </button>
              ))}
              
              {filteredProcessors.length === 0 && (
                <div className="user-assign-modal-empty-state">
                  No processors found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="user-assign-modal-footer">
          <button
            onClick={handleClose}
            disabled={isAssigning}
            className="user-assign-modal-cancel-button"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedProcessorId || isAssigning}
            className={`user-assign-modal-assign-button ${
              !selectedProcessorId || isAssigning
                ? 'user-assign-modal-assign-button-disabled'
                : 'user-assign-modal-assign-button-enabled'
            }`}
          >
            {isAssigning ? 'Assigning...' : 'Assign'}
          </button>
        </div>
      </div>
    </div>
  );
};