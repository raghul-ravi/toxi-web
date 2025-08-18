import { AppShell } from './components/AppShell';
import { LoanPipelineView } from './components/LoanPipelineView';
import './styles/App.css';

function App() {
  return (
    <AppShell>
      <LoanPipelineView />
    </AppShell>
  );
}

export default App;