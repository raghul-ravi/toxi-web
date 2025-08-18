import { Processor } from '../types';

interface Props {
  items: Processor[];
  value?: string;
  onChange: (id: string) => void;
}

export function ProcessorPicker({ items, value, onChange }: Props) {
  return (
    <ul>
      {items.map((p) => (
        <li key={p.id}>
          <label>
            <input
              type="radio"
              checked={value === p.id}
              onChange={() => onChange(p.id)}
            />
            {p.name}
          </label>
        </li>
      ))}
    </ul>
  );
}
