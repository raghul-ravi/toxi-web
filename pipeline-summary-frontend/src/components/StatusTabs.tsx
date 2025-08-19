import '../styles/components/StatusTabs.css';

interface StatusTabsProps {
  value: string;
  onChange: (value: string) => void;
}

const tabs = [
  { id: 'unassigned', label: 'Unassigned' },
  { id: 'assigned', label: 'Assigned' },
  { id: 'pending', label: 'Pending' },
];

export const StatusTabs = ({ value, onChange }: StatusTabsProps) => {
  return (
    <div className="status-tabs-container">
      <nav className="status-tabs-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`status-tab ${value === tab.id ? 'status-tab-active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};