import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { ROUTES } from '../../constants/routes';
import { TEXT } from '../../constants/ui-text';

export default function ProtectedRoute({ children, requireRole }) {
  const { user, role, loading } = useAuth();

  if (loading) return <div style={{ padding: 40 }}>{TEXT.COMMON.LOADING}</div>;
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
