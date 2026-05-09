import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../firebase';
import { authService } from '../../services/auth-service';
import { localAuth, isAuthOfflineError } from '../../services/local-auth';
import { ROUTES } from '../../constants/app/routes';
import { DEMO_EMAIL } from '../../constants/pages/admin-login';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const routeAfterFirebaseLogin = async () => {
    if (auth.currentUser?.email === DEMO_EMAIL) {
      navigate(ROUTES.DASHBOARD);
      return;
    }
    try {
      const me = await authService.me();
      navigate(me?.role === 'admin' ? ROUTES.DASHBOARD : ROUTES.HOME);
    } catch {
      navigate(ROUTES.HOME);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        await routeAfterFirebaseLogin();
        return;
      } catch (firebaseErr) {
        if (!isAuthOfflineError(firebaseErr)) throw firebaseErr;
      }
      const session = localAuth.login({ email, password });
      navigate(session.role === 'admin' ? ROUTES.DASHBOARD : ROUTES.HOME);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setErr('');
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      await routeAfterFirebaseLogin();
    } catch (e) {
      setErr(
        isAuthOfflineError(e)
          ? 'تعذّر الاتصال بـ Google. حاول لاحقاً أو سجّل الدخول بالبريد.'
          : e.message,
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    err,
    loading,
    googleLoading,
    submit,
    loginWithGoogle,
  };
}
