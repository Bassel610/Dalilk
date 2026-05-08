import { Link } from 'react-router-dom';
import Input from '../input';
import Button from '../button';
import PasswordStrength from '../password-strength';
import { IconMail, IconLock, IconGoogle } from '../icons';
import { ROUTES } from '../../constants/app/routes';
import { TEXT } from '../../constants/app/ui-text';
import { useRegister } from '../../hooks/auth/use-register';
import '../../styles/auth.css';

export default function Register() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    err,
    loading,
    googleLoading,
    submit,
    registerWithGoogle,
  } = useRegister();

  return (
    <div className="AuthContainer">
      <form onSubmit={submit} className="AuthForm">
        <div className="auth-logo">✨</div>
        <h2>{TEXT.AUTH.REGISTER_TITLE}</h2>
        <p className="auth-subtitle">{TEXT.AUTH.REGISTER_SUBTITLE}</p>

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
          onClick={registerWithGoogle}
        >
          {TEXT.AUTH.SIGN_UP_GOOGLE}
        </Button>

        <div className="auth-divider">{TEXT.AUTH.OR_EMAIL_UP}</div>

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
          autoComplete="new-password"
          minLength={6}
          required
        />
        <PasswordStrength password={password} />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          disabled={googleLoading}
          style={{ marginTop: 10 }}
        >
          {loading ? TEXT.AUTH.LOADING_UP : TEXT.AUTH.SIGN_UP}
        </Button>

        <p className="auth-footer">
          {TEXT.AUTH.HAVE_ACCOUNT}{' '}
          <Link to={ROUTES.LOGIN}>{TEXT.AUTH.SIGN_IN_LINK}</Link>
        </p>
      </form>
    </div>
  );
}
