import { Link } from 'react-router-dom';
import Button from '../button';
import { ROUTES } from '../../constants/app/routes';
import { TEXT } from '../../constants/app/ui-text';
import { DASHBOARD_TEXT } from '../../constants/pages/dashboard';

export default function DashboardTopbar({ user, onLogout }) {
  return (
    <header className="Dashboard-topbar">
      <Link to={ROUTES.HOME} className="brand">
        <span className="brand-dot" aria-hidden="true" />
        <span>{DASHBOARD_TEXT.TITLE}</span>
      </Link>
      <div className="actions">
        <span className="user-email">{user?.email}</span>
        <Button variant="ghost" size="sm" onClick={onLogout}>
          {TEXT.NAV.LOGOUT}
        </Button>
      </div>
    </header>
  );
}
