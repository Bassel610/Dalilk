export function getInitial(name, email) {
  const src = (name || email || '?').trim();
  return src.charAt(0).toUpperCase();
}
