import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { ToastContext } from '../context/ToastContext';
import '../styles/components/ToastHost.css';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, message, type };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`toast ${
              toast.type === 'success' ? 'toast-success' : 'toast-error'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="toast-icon" />
            ) : (
              <XCircle className="toast-icon" />
            )}
            <span className="toast-content">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="toast-close-button"
            >
              <X className="toast-close-icon" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};