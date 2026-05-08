export function topRatedShops(items, limit) {
  return items
    .slice()
    .sort((a, b) => Number(b.rate || 0) - Number(a.rate || 0))
    .slice(0, limit);
}
