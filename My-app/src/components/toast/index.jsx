import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Button from '../button';
import { IconCheck, IconAlert, IconInfo, IconClose } from '../icons';
import './styles.css';

const ToastContext = createContext(null);

const ICONS = {
  success: <IconCheck strokeWidth={3} />,
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
            <Button
              variant="ghost"
              size="sm"
              className="Toast-close"
              onClick={() => dismiss(t.id)}
              aria-label="Close"
            >
              <IconClose />
            </Button>
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
