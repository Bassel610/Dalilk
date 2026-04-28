import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import './styles.css';

const ToastContext = createContext(null);

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconAlert() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="8" x2="12" y2="13" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
function IconInfo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="11" x2="12" y2="17" /><line x1="12" y1="7" x2="12.01" y2="7" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const ICONS = {
  success: <IconCheck />,
  error: <IconAlert />,
  info: <IconInfo />,
};

let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)),
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      const timer = timersRef.current.get(id);
      if (timer) {
        clearTimeout(timer);
        timersRef.current.delete(id);
      }
    }, 180);
  }, []);

  const push = useCallback(
    (type, message, opts = {}) => {
      const id = nextId++;
      const duration = opts.duration ?? 3500;
      setToasts((prev) => [...prev, { id, type, message, leaving: false }]);
      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timersRef.current.set(id, timer);
      }
      return id;
    },
    [dismiss],
  );

  const value = {
    success: (m, o) => push('success', m, o),
    error: (m, o) => push('error', m, o),
    info: (m, o) => push('info', m, o),
    dismiss,
  };

  useEffect(() => () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current.clear();
  }, []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="ToastViewport" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`Toast Toast--${t.type} ${t.leaving ? 'is-leaving' : ''}`.trim()}
          >
            <span className="Toast-icon" aria-hidden="true">{ICONS[t.type]}</span>
            <span className="Toast-body">{t.message}</span>
            <button
              type="button"
              className="Toast-close"
              onClick={() => dismiss(t.id)}
              aria-label="Close"
            >
              <IconClose />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
