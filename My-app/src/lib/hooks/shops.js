export function unwrapShopsResponse(res) {
  if (Array.isArray(res)) return { items: res, total: res.length };
  if (res && Array.isArray(res.items)) return res;
  return { items: [], total: 0 };
}
