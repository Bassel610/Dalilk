import Button from '../button';
import { CONFIRM_DEFAULTS } from '../../constants/components/confirm-dialog';
import { IconWarn, IconHelp } from '../icons';

export default function ConfirmDialog({ state, onClose }) {
  const variant = state?.variant || 'danger';
  const Icon = variant === 'danger' ? IconWarn : IconHelp;

  return (
    <div
      className="ConfirmOverlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(false);
      }}
    >
      <div className="ConfirmDialog" role="alertdialog" aria-modal="true">
        <div className="ConfirmDialog-body">
          <div className={`ConfirmDialog-icon ${variant === 'danger' ? '' : 'is-info'}`}>
            <Icon />
          </div>
          <div className="ConfirmDialog-text">
            <h3>{state.title}</h3>
            {state.message && <p>{state.message}</p>}
          </div>
        </div>
        <div className="ConfirmDialog-footer">
          <Button variant="ghost" onClick={() => onClose(false)}>
            {state.cancelLabel || CONFIRM_DEFAULTS.CANCEL_LABEL}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={() => onClose(true)}
            autoFocus
          >
            {state.confirmLabel || CONFIRM_DEFAULTS.CONFIRM_LABEL}
          </Button>
        </div>
      </div>
    </div>
  );
}
