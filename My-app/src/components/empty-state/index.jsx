import Button from '../button';
import { IconBox } from '../icons';
import './styles.css';

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
        <Button variant="primary" to={to} className="EmptyState-action">
          {action}
        </Button>
      )}
      {action && onAction && (
        <Button variant="primary" className="EmptyState-action" onClick={onAction}>
          {action}
        </Button>
      )}
    </div>
  );
}
