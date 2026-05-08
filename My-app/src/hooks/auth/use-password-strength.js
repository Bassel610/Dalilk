const STRENGTH_COLORS = ['', '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];

export function usePasswordStrength(password) {
  if (!password) return { score: 0, color: STRENGTH_COLORS[0], levels: 5 };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return { score, color: STRENGTH_COLORS[score] || STRENGTH_COLORS[5], levels: 5 };
}
