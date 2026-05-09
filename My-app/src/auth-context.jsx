import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { authService } from './services/auth-service';
import { localAuth } from './services/local-auth';
import { DEMO_EMAIL } from './constants/pages/admin-login';

const AuthContext = createContext(null);

function fromLocalSession(s) {
  if (!s) return null;
  return {
    email: s.email,
    displayName: s.displayName,
    isLocal: true,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const applyLocal = (s) => {
      if (cancelled) return;
      if (auth.currentUser) return;
      const u = fromLocalSession(s);
      setUser(u);
      setRole(u ? s.role : null);
      setLoading(false);
    };

    const unsubFb = onAuthStateChanged(auth, async (fbUser) => {
      if (cancelled) return;
      setLoading(true);
      if (!fbUser) {
        applyLocal(localAuth.getSession());
        return;
      }
      setUser(fbUser);
      if (fbUser.email === DEMO_EMAIL) {
        setRole('admin');
        setLoading(false);
        return;
      }
      try {
        const data = await authService.sync();
        if (cancelled) return;
        setRole(data?.role || 'user');
      } catch {
        if (cancelled) return;
        setRole('user');
      } finally {
        if (!cancelled) setLoading(false);
      }
    });

    const unsubLocal = localAuth.subscribe((s) => applyLocal(s));

    return () => {
      cancelled = true;
      unsubFb();
      unsubLocal();
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      /* firebase may be offline — fine */
    }
    localAuth.signOut();
  };

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
