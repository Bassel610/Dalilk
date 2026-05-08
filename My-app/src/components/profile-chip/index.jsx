import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import { useAuth } from '../../hooks/auth/use-auth';
import { useProfile } from '../../hooks/profile/use-profile';
import { ROUTES } from '../../constants/app/routes';
import { TEXT } from '../../constants/app/ui-text';
import { getInitial } from '../../lib/components/profile-chip';
import { IconUser, IconLogout, IconCaret } from '../icons';
import './styles.css';

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
      <Button
        variant="ghost"
        className={`ProfileChip-trigger ${open ? 'is-open' : ''}`.trim()}
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="menu"
        aria-expanded={open}
        endIcon={<IconCaret />}
        startIcon={
          <span className="ProfileChip-avatar" aria-hidden="true">{initial}</span>
        }
      >
        <span className="ProfileChip-name">{display}</span>
      </Button>

      {open && (
        <div className="ProfileChip-menu" role="menu">
          <div className="ProfileChip-header">
            <div className="name">{name || display}</div>
            <div className="email">{user.email}</div>
          </div>
          <Button
            variant="ghost"
            to={ROUTES.PROFILE}
            className="ProfileChip-item"
            role="menuitem"
            onClick={() => setOpen(false)}
            startIcon={<IconUser />}
          >
            {TEXT.PROFILE.MENU_PROFILE}
          </Button>
          <div className="ProfileChip-divider" />
          <Button
            variant="ghost"
            className="ProfileChip-item ProfileChip-item--danger"
            role="menuitem"
            onClick={handleLogout}
            startIcon={<IconLogout />}
          >
            {TEXT.PROFILE.MENU_LOGOUT}
          </Button>
        </div>
      )}
    </div>
  );
}
