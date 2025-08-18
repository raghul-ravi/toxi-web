import React from 'react';
import { KpiItem } from '../types/types';
import { Home, Users } from 'lucide-react';

interface KPIChipsProps {
  items: KpiItem[];
}

const getIcon = (label: string) => {
  if (label.toLowerCase().includes('total')) return <Home className="w-4 h-4" />;
  if (label.toLowerCase().includes('unassigned')) return <Users className="w-4 h-4" />;
  return <Home className="w-4 h-4" />;
};

export const KPIChips: React.FC<KPIChipsProps> = ({ items }) => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md"
        >
          {getIcon(item.label)}
          <span className="font-medium text-gray-900">{item.value}</span>
          <span className="text-sm text-gray-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
};