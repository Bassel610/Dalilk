import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { authService } from '../../services/auth-service';
import { ROUTES } from '../../constants/app/routes';
import { DEMO_EMAIL } from '../../constants/pages/admin-login';

export function useAdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (email !== DEMO_EMAIL) {
        const data = await authService.me();
        if (data.role !== 'admin') {
          await auth.signOut();
          throw new Error('Not an admin account');
        }
      }
      navigate(ROUTES.DASHBOARD);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, err, loading, submit };
}
