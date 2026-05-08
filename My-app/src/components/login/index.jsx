import { Link } from 'react-router-dom';
import Input from '../input';
import Button from '../button';
import { IconMail, IconLock, IconGoogle } from '../icons';
import { ROUTES } from '../../constants/app/routes';
import { TEXT } from '../../constants/app/ui-text';
import { useLogin } from '../../hooks/auth/use-login';
import '../../styles/auth.css';

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    err,
    loading,
    googleLoading,
    submit,
    loginWithGoogle,
  } = useLogin();

  return (
    <div className="AuthContainer">
      <form onSubmit={submit} className="AuthForm">
        <div className="auth-logo">🔑</div>
        <h2>{TEXT.AUTH.LOGIN_SUBTITLE}</h2>
        <p className="auth-subtitle">{TEXT.AUTH.LOGIN_TITLE}</p>

        {err && (
          <div className="AuthError">
            <span>⚠</span>
            <span>{err}</span>
          </div>
        )}

        <Button
          variant="google"
          fullWidth
          loading={googleLoading}
          disabled={loading}
          startIcon={!googleLoading ? <IconGoogle /> : null}
          onClick={loginWithGoogle}
        >
          {TEXT.AUTH.SIGN_IN_GOOGLE}
        </Button>

        <div className="auth-divider">{TEXT.AUTH.OR_EMAIL_IN}</div>

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

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          disabled={googleLoading}
        >
          {loading ? TEXT.AUTH.LOADING_IN : TEXT.AUTH.SIGN_IN}
        </Button>

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
