import { SEED_FILTER_OPTIONS as O } from '../../data/filter-options';

export function pickDefined(obj) {
  const out = {};
  Object.entries(obj || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') out[k] = v;
  });
  return out;
}

function includesLoose(value, needle) {
  return String(value || '').toLowerCase().includes(String(needle).toLowerCase());
}

function labelOf(list, key) {
  if (!key) return null;
  return list?.find((o) => o.key === key)?.label || key;
}

export function applyShopFilters(shops, filters) {
  const f = pickDefined(filters);
  const conLabel = labelOf(O.conservatives, f.conservative);
  const areaLabel = labelOf(O.areasByConservative?.[f.conservative], f.area);
  const hayLabel = labelOf(O.haysByArea?.[f.area], f.hay);
  const catLabel = labelOf(O.categories, f.category);

  return shops.filter((s) => {
    if (f.search && !includesLoose(s.Name, f.search)) return false;
    if (conLabel && !includesLoose(s.AddressDetiles?.Conservative, conLabel)) return false;
    if (areaLabel && !includesLoose(s.AddressDetiles?.Area, areaLabel)) return false;
    if (hayLabel && !includesLoose(s.AddressDetiles?.Hay, hayLabel)) return false;
    if (catLabel && !(s.category || []).some((c) => includesLoose(c, catLabel))) return false;
    if (f.rate && Number(s.rate || 0) < Number(f.rate)) return false;
    return true;
  });
}
