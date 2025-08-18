interface Item {
  label: string;
  value: number;
}

export function KPIChips({ items }: { items: Item[] }) {
  return (
    <div style={{ margin: '1rem 0' }}>
      {items.map((k) => (
        <span
          key={k.label}
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.5rem',
            background: '#eee',
            borderRadius: '8px',
            marginRight: '0.5rem'
          }}
        >
          {k.label}: {k.value}
        </span>
      ))}
    </div>
  );
}
