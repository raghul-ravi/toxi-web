interface Props {
  value: string;
  onChange: (value: string) => void;
}

const tabs = ['Unassigned', 'Assigned', 'Pending'];

export function StatusTabs({ value, onChange }: Props) {
  return (
    <div style={{ margin: '1rem 0' }}>
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          disabled={value === t}
          style={{ marginRight: '0.5rem' }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
