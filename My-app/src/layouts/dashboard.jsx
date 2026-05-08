import { useNavigate } from 'react-router-dom';
import DashboardTopbar from '../components/dashboard/topbar';
import DashboardSidebar from '../components/dashboard/sidebar';
import DashboardPageHead from '../components/dashboard/page-head';
import { useAuth } from '../hooks/auth/use-auth';
import { ROUTES } from '../constants/app/routes';
import './dashboard.css';

export default function DashboardLayout({
  tabs,
  active,
  onTabChange,
  pageTitle,
  pageHint,
  children,
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="Dashboard">
      <DashboardTopbar user={user} onLogout={handleLogout} />
      <DashboardSidebar tabs={tabs} active={active} onChange={onTabChange} />
      <main className="Dashboard-main">
        <DashboardPageHead title={pageTitle} hint={pageHint} />
        <div className="Dashboard-card">{children}</div>
      </main>
    </div>
  );
}
