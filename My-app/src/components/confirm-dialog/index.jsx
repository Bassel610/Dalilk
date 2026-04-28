import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import './styles.css';

const ConfirmContext = createContext(null);

function IconWarn() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
function IconHelp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null);

  const confirm = useCallback((opts) => {
    return new Promise((resolve) => {
      setState({ ...opts, resolve });
    });
  }, []);

  const close = (result) => {
    if (state?.resolve) state.resolve(result);
    setState(null);
  };

  useEffect(() => {
    if (!state) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close(false);
      if (e.key === 'Enter') close(true);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const variant = state?.variant || 'danger';
  const icon = variant === 'danger' ? <IconWarn /> : <IconHelp />;

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state && (
        <div
          className="ConfirmOverlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) close(false);
          }}
        >
          <div className="ConfirmDialog" role="alertdialog" aria-modal="true">
            <div className="ConfirmDialog-body">
              <div className={`ConfirmDialog-icon ${variant === 'danger' ? '' : 'is-info'}`}>
                {icon}
              </div>
              <div className="ConfirmDialog-text">
                <h3>{state.title}</h3>
                {state.message && <p>{state.message}</p>}
              </div>
            </div>
            <div className="ConfirmDialog-footer">
              <button
                type="button"
                className="ConfirmDialog-btn ConfirmDialog-btn--ghost"
                onClick={() => close(false)}
              >
                {state.cancelLabel || 'إلغاء'}
              </button>
              <button
                type="button"
                className={`ConfirmDialog-btn ${
                  variant === 'danger'
                    ? 'ConfirmDialog-btn--danger'
                    : 'ConfirmDialog-btn--primary'
                }`}
                onClick={() => close(true)}
                autoFocus
              >
                {state.confirmLabel || 'تأكيد'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used within ConfirmProvider');
  return ctx;
}
