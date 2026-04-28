import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assast/Images/Logo.png';
import AllShops from './components/all-shops';
import AddShop from './components/add-shop';
import EditShop from './components/edit-shop';
import UserManagement from './components/user-management';
import { useAuth } from '../../hooks/use-auth';
import { ROUTES } from '../../constants/routes';
import { TEXT } from '../../constants/ui-text';
import './styles.css';

function IconList() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <circle cx="3.5" cy="6" r="1" /><circle cx="3.5" cy="12" r="1" /><circle cx="3.5" cy="18" r="1" />
    </svg>
  );
}
function IconEdit() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const TABS = [
  { key: 'all', label: TEXT.ADMIN.ALL_SHOPS, icon: IconList, hint: 'استعرض كل المحلات وامسح أو حدّث بياناتها' },
  { key: 'edit', label: TEXT.ADMIN.EDIT_SHOP, icon: IconEdit, hint: 'ابحث عن محل وعدّل تفاصيله' },
  { key: 'add', label: TEXT.ADMIN.ADD_SHOP, icon: IconPlus, hint: 'أضف محل جديد إلى الدليل' },
  { key: 'users', label: TEXT.ADMIN.MANAGE_USERS, icon: IconUsers, hint: 'إدارة الحسابات والصلاحيات' },
];

const VIEWS = {
  all: <AllShops />,
  add: <AddShop />,
  edit: <EditShop />,
  users: <UserManagement />,
};

export default function DashboardPage() {
  const [active, setActive] = useState('all');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  const activeTab = TABS.find((t) => t.key === active) || TABS[0];

  return (
    <div className="Dashboard">
      <header className="Dashboard-topbar">
        <Link to={ROUTES.HOME} className="brand">
          <span className="brand-dot" aria-hidden="true" />
          <span>لوحة التحكم — دليلك</span>
        </Link>
        <div className="actions">
          <span className="user-email">{user?.email}</span>
          <button className="logout-btn" onClick={handleLogout}>
            {TEXT.NAV.LOGOUT}
          </button>
        </div>
      </header>

      <aside className="Dashboard-sidebar">
        <div className="logo">
          <img src={Logo} alt="Dalilk" />
        </div>
        <nav>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                className={`nav-item ${active === tab.key ? 'is-active' : ''}`.trim()}
                onClick={() => setActive(tab.key)}
              >
                <Icon />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="footer-link">
          <Link to={ROUTES.HOME}>← العودة للموقع</Link>
        </div>
      </aside>

      <main className="Dashboard-main">
        <div className="Dashboard-pageHead">
          <h1>{activeTab.label}</h1>
          <p>{activeTab.hint}</p>
        </div>
        <div className="Dashboard-card">{VIEWS[active]}</div>
      </main>
    </div>
  );
}
