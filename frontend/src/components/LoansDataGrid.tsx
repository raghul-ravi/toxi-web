import { ColumnDef, Loan } from '../types';

interface Props {
  rows: Loan[];
  columns: ColumnDef[];
  visibleColumnIds: string[];
  selectedRowIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
}

export function LoansDataGrid({ rows, columns, visibleColumnIds, selectedRowIds, onSelectionChange }: Props) {
  const toggle = (id: string) => {
    const next = new Set(selectedRowIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange(next);
  };

  const visibleCols = columns.filter((c) => visibleColumnIds.includes(c.id));
  const allSelected = rows.length > 0 && rows.every((r) => selectedRowIds.has(r.id));
  const toggleAll = () => {
    if (allSelected) onSelectionChange(new Set());
    else onSelectionChange(new Set(rows.map((r) => r.id)));
  };

  return (
    <table border={1} cellPadding={4} cellSpacing={0} style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>
            <input type="checkbox" checked={allSelected} onChange={toggleAll} />
          </th>
          {visibleCols.map((c) => (
            <th key={c.id}>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedRowIds.has(r.id)}
                onChange={() => toggle(r.id)}
              />
            </td>
            {visibleCols.map((c) => (
              <td key={c.id}>{(r as any)[c.id]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
