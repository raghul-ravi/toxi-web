import React from 'react';
import { Check, User } from 'lucide-react';
import { Processor } from '../../types/types';

interface ProcessorListItemProps {
  processor: Processor;
  isSelected: boolean;
  onSelect: () => void;
}

export const ProcessorListItem: React.FC<ProcessorListItemProps> = ({
  processor,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-blue-50 border-r-2 border-blue-500' : ''
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
        {isSelected && (
          <Check className="w-4 h-4 text-blue-600" />
        )}
      </div>
    </button>
  );
};