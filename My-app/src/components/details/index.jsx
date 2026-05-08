import { useMemo } from 'react';
import WebsiteLayout from '../../layouts/website';
import Filter from '../filter';
import FilterChips from '../filter-chips';
import CardsList from '../card/cards-list';
import { CardSkeleton } from '../skeleton';
import EmptyState from '../empty-state';
import { useShopsList } from '../../hooks/shops/use-shops-list';
import { useFilterOptions } from '../../hooks/shops/use-filter-options';
import { useDebounce } from '../../hooks/use-debounce';
import { useUrlFilters } from '../../hooks/use-url-filters';
import { DETAILS_TEXT } from '../../constants/pages/details';

export default function Details({ search, inputvalue, onchangefun, searchBTN, id }) {
  const debouncedSearch = useDebounce(search, 300);
  const { filters, setFilter, reset } = useUrlFilters();

  const queryFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [filters, debouncedSearch],
  );

  const { shops, loading, error } = useShopsList(queryFilters);
  const filterOptions = useFilterOptions();

  let content;
  if (loading) {
    content = <CardSkeleton count={3} />;
  } else if (error) {
    content = <EmptyState title={DETAILS_TEXT.ERROR_TITLE} description={error} />;
  } else if (shops.length === 0) {
    content = (
      <EmptyState
        title={DETAILS_TEXT.EMPTY_TITLE}
        description={DETAILS_TEXT.EMPTY_DESC}
      />
    );
  } else {
    content = <CardsList shops={shops} />;
  }

  return (
    <WebsiteLayout headerProps={{ id, inputvalue, onchangefun, searchBTN }}>
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
      {content}
    </WebsiteLayout>
  );
}
