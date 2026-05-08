import { CATEGORY_LABEL_TO_KEY } from '../../../../constants/pages/home/components/categories-grid';

export function countShopsByCategoryKey(shops) {
  const byLabel = {};
  shops.forEach((s) => {
    (s.category || []).forEach((c) => {
      byLabel[c] = (byLabel[c] || 0) + 1;
    });
  });
  const out = {};
  Object.entries(byLabel).forEach(([label, n]) => {
    const k = CATEGORY_LABEL_TO_KEY[label];
    if (k) out[k] = (out[k] || 0) + n;
  });
  return out;
}
