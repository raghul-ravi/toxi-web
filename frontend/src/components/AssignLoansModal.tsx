import { useState } from 'react';
import { Processor } from '../types';
import { ProcessorPicker } from './ProcessorPicker';

interface Props {
  open: boolean;
  selectedLoanIds: string[];
  processors: Processor[];
  onClose: () => void;
  onConfirm: (processorId: string) => void;
}

export function AssignLoansModal({ open, selectedLoanIds, processors, onClose, onConfirm }: Props) {
  const [processorId, setProcessorId] = useState('');
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.3)'
      }}
    >
      <div style={{ background: '#fff', margin: '10% auto', padding: '1rem', width: '300px' }}>
        <h3>Assign Loans</h3>
        <div>
          <strong>Selected Loans</strong>
          <ul>
            {selectedLoanIds.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </div>
        <ProcessorPicker items={processors} value={processorId} onChange={setProcessorId} />
        <button onClick={onClose} style={{ marginRight: '0.5rem' }}>
          Cancel
        </button>
        <button disabled={!processorId} onClick={() => onConfirm(processorId)}>
          Assign
        </button>
      </div>
    </div>
  );
}
