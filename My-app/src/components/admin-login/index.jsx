import Input from '../input';
import Button from '../button';
import { IconMail, IconLock } from '../icons';
import { TEXT } from '../../constants/app/ui-text';
import { DEMO_EMAIL, DEMO_PASSWORD } from '../../constants/pages/admin-login';
import { useAdminLogin } from '../../hooks/auth/use-admin-login';
import DemoCreds from './demo-creds';
import '../../styles/auth.css';

export default function AdminLogin() {
  const { email, setEmail, password, setPassword, err, loading, submit } =
    useAdminLogin();

  const autofill = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
  };

  return (
    <div className="AuthContainer">
      <form onSubmit={submit} className="AuthForm">
        <div className="auth-logo">🛡️</div>
        <h2>{TEXT.AUTH.ADMIN_TITLE}</h2>

        {err && (
          <div className="AuthError">
            <span>⚠</span>
            <span>{err}</span>
          </div>
        )}

        <Input
          label={TEXT.AUTH.EMAIL}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<IconMail />}
          autoComplete="email"
          required
        />
        <Input
          label={TEXT.AUTH.PASSWORD}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<IconLock />}
          togglePassword
          autoComplete="current-password"
          required
        />

        <Button type="submit" variant="primary" fullWidth loading={loading}>
          {loading ? TEXT.AUTH.LOADING_IN : TEXT.AUTH.SIGN_IN}
        </Button>

        <DemoCreds onAutofill={autofill} />
      </form>
    </div>
  );
}
