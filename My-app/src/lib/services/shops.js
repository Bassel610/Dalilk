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

export function applyShopFilters(shops, filters) {
  const f = pickDefined(filters);
  return shops.filter((s) => {
    if (f.search && !includesLoose(s.Name, f.search)) return false;
    if (f.conservative && !includesLoose(s.AddressDetiles?.Conservative, f.conservative)) return false;
    if (f.area && !includesLoose(s.AddressDetiles?.Area, f.area)) return false;
    if (f.hay && !includesLoose(s.AddressDetiles?.Hay, f.hay)) return false;
    if (f.category && !(s.category || []).some((c) => includesLoose(c, f.category))) return false;
    if (f.rate && Number(s.rate || 0) < Number(f.rate)) return false;
    return true;
  });
}
