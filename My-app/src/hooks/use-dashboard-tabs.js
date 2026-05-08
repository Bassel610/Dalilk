import { useState, useMemo } from 'react';
import { DASHBOARD_TABS } from '../constants/pages/dashboard';

export function useDashboardTabs(initialKey = 'all') {
  const [active, setActive] = useState(initialKey);
  const activeTab = useMemo(
    () => DASHBOARD_TABS.find((t) => t.key === active) || DASHBOARD_TABS[0],
    [active],
  );
  return {
    tabs: DASHBOARD_TABS,
    active,
    activeTab,
    setActive,
  };
}
