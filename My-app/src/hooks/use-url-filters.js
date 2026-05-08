import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  emptyFilters,
  filtersFromUrl,
  filtersToQuery,
} from '../lib/pages/details';

export function useUrlFilters() {
  const location = useLocation();
  const navigate = useNavigate();

  const [filters, setFilters] = useState(() => filtersFromUrl(location.search));
  const lastUrlRef = useRef(location.search);

  useEffect(() => {
    if (location.search === lastUrlRef.current) return;
    lastUrlRef.current = location.search;
    setFilters(filtersFromUrl(location.search));
  }, [location.search]);

  const setFilter = (key, value) => {
    const next = { ...filters, [key]: value };
    if (key === 'conservative') {
      next.area = '';
      next.hay = '';
    }
    if (key === 'area') next.hay = '';

    setFilters(next);
    const newQuery = filtersToQuery(next);
    lastUrlRef.current = newQuery;
    navigate(`${location.pathname}${newQuery}`, { replace: true });
  };

  const reset = () => {
    setFilters(emptyFilters());
    lastUrlRef.current = '';
    navigate(location.pathname, { replace: true });
  };

  return { filters, setFilter, reset };
}
