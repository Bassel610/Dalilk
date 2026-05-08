import { PROFILE_FIELDS } from '../../constants/pages/profile';

export function getInitial(name, email) {
  return ((name || email || '?').trim().charAt(0) || '?').toUpperCase();
}

export function completionStats(profile) {
  const total = PROFILE_FIELDS.length;
  const filled = PROFILE_FIELDS.filter(
    (f) => (profile[f.key] || '').trim().length > 0,
  ).length;
  return { filled, total };
}
