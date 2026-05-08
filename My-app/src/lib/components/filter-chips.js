export function findFilterLabel(options, kind, key) {
  if (kind === 'rate') return key;
  if (kind === 'conservative')
    return options.conservatives?.find((o) => o.key === key)?.label || key;
  if (kind === 'area')
    return options.areas?.find((o) => o.key === key)?.label || key;
  if (kind === 'hay')
    return options.hays?.find((o) => o.key === key)?.label || key;
  if (kind === 'category')
    return options.categories?.find((o) => o.key === key)?.label || key;
  return key;
}
