interface Props {
  count: number;
  onCancel: () => void;
  onAssign: () => void;
}

export function SelectionActionBar({ count, onCancel, onAssign }: Props) {
  if (count === 0) return null;
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        background: '#fff',
        padding: '1rem',
        borderTop: '1px solid #ccc',
        marginTop: '1rem'
      }}
    >
      {count} Loans Selected
      <button onClick={onCancel} style={{ marginLeft: '1rem' }}>
        Cancel
      </button>
      <button onClick={onAssign} style={{ marginLeft: '0.5rem' }}>
        Assign Loans
      </button>
    </div>
  );
}
