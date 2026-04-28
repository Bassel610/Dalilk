import { useEffect, useState, useCallback, useRef } from 'react';
import { shopsService } from '../services/shops-service';

function unwrap(res) {
  if (Array.isArray(res)) return { items: res, total: res.length };
  if (res && Array.isArray(res.items)) return res;
  return { items: [], total: 0 };
}

export function useShops(filters) {
  const [shops, setShops] = useState([]);
  const [meta, setMeta] = useState({ total: 0, limit: 0, offset: 0, hasMore: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reqIdRef = useRef(0);

  const reload = useCallback(
    async (overrideFilters) => {
      const reqId = ++reqIdRef.current;
      setLoading(true);
      setError(null);
      try {
        const res = await shopsService.list(overrideFilters ?? filters);
        if (reqId !== reqIdRef.current) return;
        const { items, total, limit, offset, hasMore } = unwrap(res);
        setShops(items);
        setMeta({ total, limit, offset, hasMore: !!hasMore });
      } catch (e) {
        if (reqId !== reqIdRef.current) return;
        setError(e.message);
        setShops([]);
      } finally {
        if (reqId === reqIdRef.current) setLoading(false);
      }
    },
    [filters],
  );

  useEffect(() => {
    reload();
  }, [reload]);

  const remove = async (id) => {
    await shopsService.remove(id);
    setShops((prev) => prev.filter((s) => s.id !== id));
  };

  const create = async (shop) => {
    await shopsService.create(shop);
    await reload();
  };

  const update = async (id, shop) => {
    await shopsService.update(id, shop);
    await reload();
  };

  return { shops, meta, loading, error, reload, remove, create, update };
}
