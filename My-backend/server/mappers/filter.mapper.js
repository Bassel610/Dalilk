function toOption(d) {
  return { key: d.key, label: d.label };
}

function buildFilterOptions(docs) {
  const areasByConservative = {};
  docs.areas.forEach((a) => {
    if (!a.conservativeKey) return;
    if (!areasByConservative[a.conservativeKey]) areasByConservative[a.conservativeKey] = [];
    areasByConservative[a.conservativeKey].push(toOption(a));
  });

  const haysByArea = {};
  docs.hays.forEach((h) => {
    if (!h.areaKey) return;
    if (!haysByArea[h.areaKey]) haysByArea[h.areaKey] = [];
    haysByArea[h.areaKey].push(toOption(h));
  });

  return {
    conservatives: docs.conservatives.map(toOption),
    areas: docs.areas.map(toOption),
    hays: docs.hays.map(toOption),
    areasByConservative,
    haysByArea,
    categories: docs.categories.map(toOption),
    rates: ['1', '2', '3', '4', '5'].map((r) => ({ key: r, label: r })),
  };
}

function lookupBySlug(items, slug) {
  return items.find((d) => d.key === slug) || null;
}

module.exports = { buildFilterOptions, lookupBySlug, toOption };
