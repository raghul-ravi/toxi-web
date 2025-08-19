import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, GripVertical, Check } from 'lucide-react';
import '../styles/components/CustomizeColumns.css';
import type { ColumnDef } from '../types/types';

interface CustomizeColumnsProps {
  columns: ColumnDef[];
  visibleColumnIds: string[];
  onChange: (visibleIds: string[]) => void;
}

export const CustomizeColumns = ({
  columns,
  visibleColumnIds,
  onChange,
}: CustomizeColumnsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredColumns = columns.filter(column =>
    column.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (columnId: string) => {
    const newVisibleIds = visibleColumnIds.includes(columnId)
      ? visibleColumnIds.filter(id => id !== columnId)
      : [...visibleColumnIds, columnId];
    onChange(newVisibleIds);
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="customize-columns-container" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="customize-columns-trigger-button"
      >
        <span>Customize Columns</span>
        <ChevronDown className={`customize-columns-chevron ${isOpen ? 'customize-columns-chevron-open' : ''}`} />
      </button>

      {isOpen && (
        <div className="customize-columns-dropdown">
          {/* Header */}
          <div className="customize-columns-header">
            <h3 className="customize-columns-header-title">Select Columns</h3>
            
            {/* Search */}
            <div className="customize-columns-search-container">
              <Search className="customize-columns-search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="customize-columns-search-input"
              />
            </div>
          </div>
          
          {/* Column List */}
          <div className="customize-columns-body">
            <div className="customize-columns-column-list">
              {filteredColumns.length === 0 ? (
                <div className="customize-columns-empty-state">
                  No columns found matching "{searchTerm}"
                </div>
              ) : (
                filteredColumns.map((column) => {
                  const isSelected = visibleColumnIds.includes(column.id);
                  return (
                    <div
                      key={column.id}
                      onClick={() => handleToggle(column.id)}
                      className={`customize-columns-column-item ${
                        isSelected ? 'customize-columns-column-item-selected' : ''
                      }`}
                    >
                      <GripVertical 
                        className={`customize-columns-column-icon ${
                          isSelected ? 'customize-columns-column-icon-selected' : ''
                        }`}
                      />
                      <div className="customize-columns-column-label">
                        <div className="customize-columns-column-label-text">{column.label}</div>
                      </div>
                      {isSelected && (
                        <Check className="customize-columns-check-icon" />
                      )}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggle(column.id)}
                        className="customize-columns-column-checkbox"
                        tabIndex={-1}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="customize-columns-footer">
            <button
              onClick={() => {
                setIsOpen(false);
                setSearchTerm('');
              }}
              className="customize-columns-done-button"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};