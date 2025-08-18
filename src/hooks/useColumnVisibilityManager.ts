import { useState, useEffect } from 'react';
import { ColumnDef } from '../types/types';

const STORAGE_KEY = 'pipeline-summary-visible-columns';

export const useColumnVisibilityManager = (columns: ColumnDef[]) => {
  const defaultVisibleIds = columns.map(col => col.id);
  
  const [visibleColumnIds, setVisibleColumnIds] = useState<string[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Validate that all stored IDs are valid column IDs
        const validIds = parsed.filter((id: string) => 
          columns.some(col => col.id === id)
        );
        return validIds.length > 0 ? validIds : defaultVisibleIds;
      } catch {
        return defaultVisibleIds;
      }
    }
    return defaultVisibleIds;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visibleColumnIds));
  }, [visibleColumnIds]);

  return {
    visibleColumnIds,
    setVisibleColumnIds,
  };
};