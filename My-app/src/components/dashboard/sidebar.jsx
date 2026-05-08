import { Link } from 'react-router-dom';
import Logo from '../../assast/Images/Logo.png';
import Button from '../button';
import { ROUTES } from '../../constants/app/routes';
import { DASHBOARD_TEXT } from '../../constants/pages/dashboard';
import { TAB_ICONS, IconList } from '../icons';

export default function DashboardSidebar({ tabs, active, onChange }) {
  return (
    <aside className="Dashboard-sidebar">
      <div className="logo">
        <img src={Logo} alt="Dalilk" />
      </div>
      <nav>
        {tabs.map((tab) => {
          const Icon = TAB_ICONS[tab.icon] || IconList;
          return (
            <Button
              key={tab.key}
              variant="ghost"
              className={`nav-item ${active === tab.key ? 'is-active' : ''}`.trim()}
              startIcon={<Icon />}
              onClick={() => onChange(tab.key)}
            >
              {tab.label}
            </Button>
          );
        })}
      </nav>
      <div className="footer-link">
        <Link to={ROUTES.HOME}>{DASHBOARD_TEXT.BACK_TO_SITE}</Link>
      </div>
    </aside>
  );
}
