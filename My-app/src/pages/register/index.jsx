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

function PasswordStrength({ password }) {
  if (!password) return null;
  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const colors = ['', '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];

  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: i <= strength ? colors[strength] : '#eee',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await authService.register(email, password);
      await signInWithEmailAndPassword(auth, email, password);
      navigate(ROUTES.HOME);
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
      navigate(ROUTES.HOME);
    } catch (e) {
      setErr(e.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="AuthContainer">
      <form onSubmit={handleRegister} className="AuthForm">
        <div className="auth-logo">✨</div>
        <h2>{TEXT.AUTH.REGISTER_TITLE}</h2>
        <p className="auth-subtitle">{TEXT.AUTH.REGISTER_SUBTITLE}</p>

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
          {TEXT.AUTH.SIGN_UP_GOOGLE}
        </button>

        <div className="auth-divider">{TEXT.AUTH.OR_EMAIL_UP}</div>

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
          autoComplete="new-password"
          minLength={6}
          required
        />
        <PasswordStrength password={password} />

        <button
          type="submit"
          className="AuthBtn AuthBtn-primary"
          disabled={loading || googleLoading}
          style={{ marginTop: 10 }}
        >
          {loading ? <span className="auth-spinner" /> : null}
          {loading ? TEXT.AUTH.LOADING_UP : TEXT.AUTH.SIGN_UP}
        </button>

        <p className="auth-footer">
          {TEXT.AUTH.HAVE_ACCOUNT}{' '}
          <Link to={ROUTES.LOGIN}>{TEXT.AUTH.SIGN_IN_LINK}</Link>
        </p>
      </form>
    </div>
  );
}
