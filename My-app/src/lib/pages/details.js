import { FILTER_KEYS } from '../../constants/pages/details';

export const emptyFilters = () =>
  FILTER_KEYS.reduce((acc, k) => ({ ...acc, [k]: '' }), {});

export const filtersFromUrl = (search) => {
  const params = new URLSearchParams(search);
  const out = emptyFilters();
  FILTER_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) out[k] = v;
  });
  return out;
};

export const filtersToQuery = (filters) => {
  const params = new URLSearchParams();
  FILTER_KEYS.forEach((k) => {
    if (filters[k]) params.set(k, filters[k]);
  });
  const s = params.toString();
  return s ? `?${s}` : '';
};
