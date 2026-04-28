import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Filter from '../../components/filter';
import FilterChips from '../../components/filter-chips';
import { CardsList } from '../../components/card';
import { CardSkeleton } from '../../components/skeleton';
import EmptyState from '../../components/empty-state';
import { useShops } from '../../hooks/use-shops';
import { useFilterOptions } from '../../hooks/use-filter-options';
import { useDebounce } from '../../hooks/use-debounce';
import { TEXT } from '../../constants/ui-text';

const FILTER_KEYS = ['conservative', 'area', 'hay', 'category', 'rate'];

const emptyFilters = () =>
  FILTER_KEYS.reduce((acc, k) => ({ ...acc, [k]: '' }), {});

const fromUrl = (search) => {
  const params = new URLSearchParams(search);
  const out = emptyFilters();
  FILTER_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) out[k] = v;
  });
  return out;
};

const toQuery = (filters) => {
  const params = new URLSearchParams();
  FILTER_KEYS.forEach((k) => {
    if (filters[k]) params.set(k, filters[k]);
  });
  const s = params.toString();
  return s ? `?${s}` : '';
};

export default function DetailsPage({ search, inputvalue, onchangefun, searchBTN, id }) {
  const location = useLocation();
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(search, 300);

  const [filters, setFilters] = useState(() => fromUrl(location.search));
  const lastUrlRef = useRef(location.search);

  // External URL changes (header category click, back button) → sync state
  useEffect(() => {
    if (location.search === lastUrlRef.current) return;
    lastUrlRef.current = location.search;
    setFilters(fromUrl(location.search));
  }, [location.search]);

  const setFilter = (key, value) => {
    const next = { ...filters, [key]: value };
    if (key === 'conservative') {
      next.area = '';
      next.hay = '';
    }
    if (key === 'area') next.hay = '';

    setFilters(next);

    const newQuery = toQuery(next);
    lastUrlRef.current = newQuery;
    navigate(`${location.pathname}${newQuery}`, { replace: true });
  };

  const reset = () => {
    setFilters(emptyFilters());
    lastUrlRef.current = '';
    navigate(location.pathname, { replace: true });
  };

  const queryFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [filters, debouncedSearch],
  );

  const { shops, loading, error } = useShops(queryFilters);
  const filterOptions = useFilterOptions();

  return (
    <>
      <Header
        id={id}
        inputvalue={inputvalue}
        onchangefun={onchangefun}
        searchBTN={searchBTN}
      />
      <Filter
        filters={filters}
        setFilter={setFilter}
        reset={reset}
        options={filterOptions}
      />
      <FilterChips
        filters={filters}
        options={filterOptions}
        setFilter={setFilter}
        reset={reset}
      />
      {loading ? (
        <CardSkeleton count={3} />
      ) : error ? (
        <EmptyState title="حدث خطأ" description={error} />
      ) : shops.length === 0 ? (
        <EmptyState
          title="لا توجد محلات تطابق البحث"
          description="جرّب إزالة بعض الفلاتر أو تعديل كلمة البحث."
        />
      ) : (
        <CardsList shops={shops} />
      )}
      <Footer />
    </>
  );
}
