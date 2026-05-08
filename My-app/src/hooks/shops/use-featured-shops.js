import { useEffect, useState } from 'react';
import { shopsService } from '../../services/shops-service';
import { topRatedShops } from '../../lib/pages/home/components/featured';
import { FEATURED_LIMIT } from '../../constants/pages/home/components/featured';

export function useFeaturedShops(limit = FEATURED_LIMIT) {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await shopsService.list({ limit: 100 });
        if (cancelled) return;
        const items = Array.isArray(res) ? res : res?.items || [];
        setShops(topRatedShops(items, limit));
      } catch {
        if (!cancelled) setShops([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { shops, loading };
}
