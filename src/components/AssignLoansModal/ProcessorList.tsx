import React from 'react';
import { Processor } from '../../types/types';
import { ProcessorListItem } from './ProcessorListItem';

interface ProcessorListProps {
  processors: Processor[];
  selectedProcessorId: string;
  onSelect: (processorId: string) => void;
  loading?: boolean;
}

export const ProcessorList: React.FC<ProcessorListProps> = ({
  processors,
  selectedProcessorId,
  onSelect,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        <div className="animate-pulse">Loading processors...</div>
      </div>
    );
  }

  if (processors.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No processors found
      </div>
    );
  }

  return (
    <div className="py-2">
      {processors.map((processor) => (
        <ProcessorListItem
          key={processor.id}
          processor={processor}
          isSelected={processor.id === selectedProcessorId}
          onSelect={() => onSelect(processor.id)}
        />
      ))}
    </div>
  );
};