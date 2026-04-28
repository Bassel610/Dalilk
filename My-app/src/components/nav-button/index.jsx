import { Link } from 'react-router-dom';
import './styles.css';

export default function NavButton({
  variant = 'outline',
  to,
  onClick,
  type = 'button',
  children,
  className = '',
}) {
  const cls = `NavBtn NavBtn--${variant} ${className}`.trim();
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
