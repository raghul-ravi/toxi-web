import type { ReactNode } from 'react';
import styles from '../styles/components/AppShell.module.css';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <h1 className={styles.logoTitle}>MOXI</h1>
          </div>
          <div className={styles.userSection}>
            <span className={styles.userName}>Edward Ralph</span>
            <div className={styles.avatar}>
              <span className={styles.avatarText}>ER</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};