import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function AppShell({ children }: Props) {
  return (
    <div>
      <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <h1>Toxi Web</h1>
      </header>
      <main style={{ padding: '1rem' }}>{children}</main>
    </div>
  );
}
