import { useEffect, useState } from 'react';
import { shopsService } from '../../services/shops-service';
import { countShopsByCategoryKey } from '../../lib/pages/home/components/categories-grid';

export function useCategoryCounts() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await shopsService.list({ limit: 100 });
        if (cancelled) return;
        const shops = Array.isArray(res) ? res : res?.items || [];
        setCounts(countShopsByCategoryKey(shops));
      } catch {
        /* keep counts empty */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return counts;
}
