import { DEMO_EMAIL, DEMO_PASSWORD } from '../constants/pages/admin-login';

const USERS_KEY = 'dalilk_local_users_v1';
const SESSION_KEY = 'dalilk_local_session_v1';

function hashPassword(pw) {
  let h = 0x811c9dc5;
  for (let i = 0; i < pw.length; i++) {
    h ^= pw.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return `h_${h.toString(16)}_${pw.length}`;
}

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  const seed = [
    {
      email: DEMO_EMAIL,
      displayName: 'Admin',
      role: 'admin',
      hash: hashPassword(DEMO_PASSWORD),
      createdAt: Date.now(),
    },
  ];
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(seed));
  } catch {
    /* ignore */
  }
  return seed;
}

function writeUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* ignore */
  }
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return null;
}

const subscribers = new Set();
let session = loadSession();

function persistSession(next) {
  session = next;
  try {
    if (next) localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
  subscribers.forEach((fn) => {
    try {
      fn(session);
    } catch {
      /* ignore */
    }
  });
}

function buildSession(user) {
  return {
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    isLocal: true,
  };
}

export const localAuth = {
  getSession: () => session,
  subscribe: (fn) => {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  },
  register: ({ email, password, displayName }) => {
    const trimmed = (email || '').trim().toLowerCase();
    if (!trimmed) throw new Error('البريد الإلكتروني مطلوب');
    if (!password || password.length < 6) {
      throw new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
    }
    const users = readUsers();
    if (users.some((u) => u.email === trimmed)) {
      throw new Error('هذا البريد مسجل بالفعل');
    }
    const role = trimmed === DEMO_EMAIL ? 'admin' : 'user';
    const user = {
      email: trimmed,
      displayName: displayName || trimmed.split('@')[0],
      role,
      hash: hashPassword(password),
      createdAt: Date.now(),
    };
    users.push(user);
    writeUsers(users);
    persistSession(buildSession(user));
    return session;
  },
  login: ({ email, password }) => {
    const trimmed = (email || '').trim().toLowerCase();
    const users = readUsers();
    const user = users.find((u) => u.email === trimmed);
    if (!user || user.hash !== hashPassword(password)) {
      throw new Error('البريد أو كلمة المرور غير صحيحة');
    }
    persistSession(buildSession(user));
    return session;
  },
  signOut: () => persistSession(null),
};

export function isAuthOfflineError(err) {
  if (!err) return false;
  if (err.isBackendOffline === true) return true;
  if (err.code === 'auth/network-request-failed') return true;
  if (err.code === 'auth/internal-error') return true;
  if (err.message === 'Network Error') return true;
  return false;
}
