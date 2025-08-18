import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, List } from 'lucide-react';
import styles from '../styles/components/FunctionalCustomizeColumns.module.css';
import type { ColumnDef } from '../types/types';

interface FunctionalCustomizeColumnsProps {
  columns: ColumnDef[];
  visibleColumnIds: string[];
  onChange: (visibleIds: string[]) => void;
}

export const FunctionalCustomizeColumns = ({
  columns,
  visibleColumnIds,
  onChange,
}: FunctionalCustomizeColumnsProps) => {
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
    <div className={styles.container} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.triggerButton}
      >
        <span>Customize Columns</span>
        <ChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {/* Header */}
          <div className={styles.header}>
            <h3 className={styles.headerTitle}>Select Columns</h3>
            
            {/* Search */}
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
          
          {/* Column List */}
          <div className={styles.columnList}>
            {filteredColumns.length === 0 ? (
              <div className={styles.emptyState}>
                No columns found matching "{searchTerm}"
              </div>
            ) : (
              filteredColumns.map((column) => (
                <label
                  key={column.id}
                  className={styles.columnItem}
                >
                  <List className={styles.columnIcon} />
                  <div className={styles.columnLabel}>
                    <div className={styles.columnLabelText}>{column.label}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={visibleColumnIds.includes(column.id)}
                    onChange={() => handleToggle(column.id)}
                    className={styles.columnCheckbox}
                  />
                </label>
              ))
            )}
          </div>
          
          {/* Footer */}
          <div className={styles.footer}>
            <button
              onClick={() => {
                setIsOpen(false);
                setSearchTerm('');
              }}
              className={styles.doneButton}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};