import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { useProfile } from '../../hooks/use-profile';
import { ROUTES } from '../../constants/routes';
import { TEXT } from '../../constants/ui-text';
import './styles.css';

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function IconCaret() {
  return (
    <svg className="ProfileChip-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function getInitial(name, email) {
  const src = (name || email || '?').trim();
  return src.charAt(0).toUpperCase();
}

export default function ProfileChip() {
  const { user, logout } = useAuth();
  const { data } = useProfile();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!user) return null;

  const name = data?.profile?.name || '';
  const display = name || (user.email || '').split('@')[0];
  const initial = getInitial(name, user.email);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="ProfileChip" ref={ref}>
      <button
        type="button"
        className={`ProfileChip-trigger ${open ? 'is-open' : ''}`.trim()}
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="ProfileChip-avatar" aria-hidden="true">{initial}</span>
        <span className="ProfileChip-name">{display}</span>
        <IconCaret />
      </button>

      {open && (
        <div className="ProfileChip-menu" role="menu">
          <div className="ProfileChip-header">
            <div className="name">{name || display}</div>
            <div className="email">{user.email}</div>
          </div>
          <Link
            to={ROUTES.PROFILE}
            className="ProfileChip-item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <IconUser />
            <span>{TEXT.PROFILE.MENU_PROFILE}</span>
          </Link>
          <div className="ProfileChip-divider" />
          <button
            type="button"
            className="ProfileChip-item ProfileChip-item--danger"
            role="menuitem"
            onClick={handleLogout}
          >
            <IconLogout />
            <span>{TEXT.PROFILE.MENU_LOGOUT}</span>
          </button>
        </div>
      )}
    </div>
  );
}
