import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../firebase';
import { authService } from '../../services/auth-service';
import { ROUTES } from '../../constants/app/routes';

export function useRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
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

  const registerWithGoogle = async () => {
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    err,
    loading,
    googleLoading,
    submit,
    registerWithGoogle,
  };
}
