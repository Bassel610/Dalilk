import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { authService } from '../../services/auth-service';
import { ROUTES } from '../../constants/routes';
import { TEXT } from '../../constants/ui-text';
import AuthField from '../../components/auth-field';
import { IconMail, IconLock } from '../../components/icons';
import '../../styles/auth.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const data = await authService.me();
      if (data.role !== 'admin') {
        await auth.signOut();
        throw new Error('Not an admin account');
      }
      navigate(ROUTES.DASHBOARD);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AuthContainer">
      <form onSubmit={handleSubmit} className="AuthForm">
        <div className="auth-logo">🛡️</div>
        <h2>{TEXT.AUTH.ADMIN_TITLE}</h2>

        {err && (
          <div className="AuthError">
            <span>⚠</span>
            <span>{err}</span>
          </div>
        )}

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
          disabled={loading}
        >
          {loading ? <span className="auth-spinner" /> : null}
          {loading ? TEXT.AUTH.LOADING_IN : TEXT.AUTH.SIGN_IN}
        </button>
      </form>
    </div>
  );
}
