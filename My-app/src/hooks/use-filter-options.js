import { useEffect, useState } from 'react';
import { shopsService } from '../services/shops-service';

const empty = {
  conservatives: [],
  areasByConservative: {},
  haysByArea: {},
  categories: [],
  rates: [],
};

export function useFilterOptions() {
  const [data, setData] = useState(empty);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await shopsService.filterOptions();
        if (!cancelled) setData(res || empty);
      } catch {
        if (!cancelled) setData(empty);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { ...data, loading };
}
