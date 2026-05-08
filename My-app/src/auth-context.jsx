import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { authService } from './services/auth-service';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (fbUser) => {
      setLoading(true);
      if (!fbUser) {
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }
      setUser(fbUser);
      if (fbUser.email === 'admin@dalilk.com') {
        setRole('admin');
        setLoading(false);
        return;
      }
      try {
        const data = await authService.sync();
        setRole(data?.role || 'user');
      } catch {
        setRole('user');
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const logout = () => signOut(auth);
  const getToken = async () =>
    auth.currentUser ? auth.currentUser.getIdToken() : null;

  return (
    <AuthContext.Provider value={{ user, role, loading, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
