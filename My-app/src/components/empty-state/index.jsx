import { Link } from 'react-router-dom';
import './styles.css';

function IconBox() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  to,
  onAction,
}) {
  return (
    <div className="EmptyState">
      <div className="EmptyState-illustration">{icon || <IconBox />}</div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action && to && (
        <Link to={to} className="EmptyState-action">{action}</Link>
      )}
      {action && onAction && (
        <button type="button" className="EmptyState-action" onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  );
}
