import { useState, lazy, Suspense } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { ROUTES } from './constants/app/routes';
import ProtectedRoute from './components/protected-route';
import PageLoader from './components/page-loader';

const HomePage = lazy(() => import('./pages/home'));
const DetailsPage = lazy(() => import('./pages/details'));
const LoginPage = lazy(() => import('./pages/login'));
const RegisterPage = lazy(() => import('./pages/register'));
const AdminLoginPage = lazy(() => import('./pages/admin-login'));
const DashboardPage = lazy(() => import('./pages/dashboard'));
const ProfilePage = lazy(() => import('./pages/profile'));

function PageFrame({ children }) {
  const location = useLocation();
  return (
    <div className="PageFade" key={location.pathname}>
      {children}
    </div>
  );
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const value = searchTerm.trim();
    if (value) {
      setSearch(value);
      navigate(`${ROUTES.DETAILS}?search=${value}`);
      setSearchTerm('');
    }
  };

  const sharedSearchProps = {
    id: 'SearchInput',
    inputvalue: searchTerm,
    onchangefun: (e) => setSearchTerm(e.target.value),
    searchBTN: handleSearch,
  };

  return (
    <div className="App">
      <Suspense fallback={<PageLoader />}>
        <PageFrame>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage {...sharedSearchProps} />} />
            <Route
              path={ROUTES.DETAILS}
              element={<DetailsPage search={search} {...sharedSearchProps} />}
            />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLoginPage />} />
            <Route
              path={ROUTES.PROFILE}
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute requireRole="admin">
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </PageFrame>
      </Suspense>
    </div>
  );
}
