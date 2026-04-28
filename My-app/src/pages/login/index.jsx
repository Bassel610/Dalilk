import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth, googleProvider } from '../../firebase';
import { authService } from '../../services/auth-service';
import { ROUTES } from '../../constants/routes';
import { TEXT } from '../../constants/ui-text';
import AuthField from '../../components/auth-field';
import { IconMail, IconLock, IconGoogle } from '../../components/icons';
import '../../styles/auth.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const routeAfterLogin = async () => {
    try {
      const me = await authService.me();
      navigate(me.role === 'admin' ? ROUTES.DASHBOARD : ROUTES.HOME);
    } catch {
      navigate(ROUTES.HOME);
    }
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await routeAfterLogin();
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setErr('');
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      await routeAfterLogin();
    } catch (e) {
      setErr(e.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="AuthContainer">
      <form onSubmit={handleEmail} className="AuthForm">
        <div className="auth-logo">🔑</div>
        <h2>{TEXT.AUTH.LOGIN_SUBTITLE}</h2>
        <p className="auth-subtitle">{TEXT.AUTH.LOGIN_TITLE}</p>

        {err && (
          <div className="AuthError">
            <span>⚠</span>
            <span>{err}</span>
          </div>
        )}

        <button
          type="button"
          className="AuthBtn AuthBtn-google"
          onClick={handleGoogle}
          disabled={googleLoading || loading}
        >
          {googleLoading ? <span className="auth-spinner" /> : <IconGoogle />}
          {TEXT.AUTH.SIGN_IN_GOOGLE}
        </button>

        <div className="auth-divider">{TEXT.AUTH.OR_EMAIL_IN}</div>

        <AuthField
          label={TEXT.AUTH.EMAIL}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<IconMail />}
          autoComplete="email"
          required
        />
        <AuthField
          label={TEXT.AUTH.PASSWORD}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<IconLock />}
          togglePassword
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          className="AuthBtn AuthBtn-primary"
          disabled={loading || googleLoading}
        >
          {loading ? <span className="auth-spinner" /> : null}
          {loading ? TEXT.AUTH.LOADING_IN : TEXT.AUTH.SIGN_IN}
        </button>

        <p className="auth-footer">
          {TEXT.AUTH.NO_ACCOUNT}{' '}
          <Link to={ROUTES.REGISTER}>{TEXT.AUTH.CREATE_ONE}</Link>
        </p>
        <span className="auth-admin-link">
          <Link to={ROUTES.ADMIN_LOGIN}>{TEXT.AUTH.ADMIN_LINK}</Link>
        </span>
      </form>
    </div>
  );
}
