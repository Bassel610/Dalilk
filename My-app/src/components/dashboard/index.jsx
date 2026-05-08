import DashboardLayout from '../../layouts/dashboard';
import AllShops from './all-shops';
import AddShop from './add-shop';
import EditShop from './edit-shop';
import UserManagement from './user-management';
import { useDashboardTabs } from '../../hooks/use-dashboard-tabs';

const VIEWS = {
  all: <AllShops />,
  add: <AddShop />,
  edit: <EditShop />,
  users: <UserManagement />,
};

export default function Dashboard() {
  const { tabs, active, activeTab, setActive } = useDashboardTabs();

  return (
    <DashboardLayout
      tabs={tabs}
      active={active}
      onTabChange={setActive}
      pageTitle={activeTab.label}
      pageHint={activeTab.hint}
    >
      {VIEWS[active]}
    </DashboardLayout>
  );
}
