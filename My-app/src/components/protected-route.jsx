import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth/use-auth';
import { ROUTES } from '../constants/app/routes';
import PageLoader from './page-loader';

export default function ProtectedRoute({ children, requireRole }) {
  const { user, role, loading } = useAuth();

  if (loading) return <PageLoader />;
  if (!user)
    return (
      <Navigate
        to={requireRole === 'admin' ? ROUTES.ADMIN_LOGIN : ROUTES.LOGIN}
        replace
      />
    );
  if (requireRole && role !== requireRole) {
    return <Navigate to={ROUTES.HOME} replace />;
  }
  return children;
}
