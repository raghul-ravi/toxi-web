import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Processor } from '../../types/types';
import { SearchInput } from './SearchInput';
import { ProcessorList } from './ProcessorList';

interface ProcessorPickerProps {
  processors: Processor[];
  selectedProcessorId: string;
  onSelect: (processorId: string) => void;
  loading?: boolean;
}

export const ProcessorPicker: React.FC<ProcessorPickerProps> = ({
  processors,
  selectedProcessorId,
  onSelect,
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProcessors = processors.filter(processor =>
    processor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    processor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Select Processor
        </h3>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <ProcessorList
          processors={filteredProcessors}
          selectedProcessorId={selectedProcessorId}
          onSelect={onSelect}
          loading={loading}
        />
      </div>
    </div>
  );
};