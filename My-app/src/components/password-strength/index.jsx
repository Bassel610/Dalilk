import { usePasswordStrength } from '../../hooks/auth/use-password-strength';
import './styles.css';

export default function PasswordStrength({ password }) {
  const { score, color, levels } = usePasswordStrength(password);
  if (!password) return null;
  return (
    <div className="PwStrength">
      <div className="PwStrength-bars">
        {Array.from({ length: levels }).map((_, i) => (
          <div
            key={i}
            className="PwStrength-bar"
            style={{ background: i < score ? color : '#eee' }}
          />
        ))}
      </div>
    </div>
  );
}
