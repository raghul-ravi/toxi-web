import { ColumnDef } from '../types';

interface Props {
  columns: ColumnDef[];
  visibleColumnIds: string[];
  onChange: (ids: string[]) => void;
}

export function CustomizeColumnsDropdown({ columns, visibleColumnIds, onChange }: Props) {
  const toggle = (id: string) => {
    const set = new Set(visibleColumnIds);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    onChange(Array.from(set));
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      {columns.map((c) => (
        <label key={c.id} style={{ display: 'block' }}>
          <input
            type="checkbox"
            checked={visibleColumnIds.includes(c.id)}
            onChange={() => toggle(c.id)}
          />
          {c.label}
        </label>
      ))}
    </div>
  );
}
