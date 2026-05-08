import Input from '../input';
import { PROFILE_FIELDS } from '../../constants/pages/profile';

export default function ProfileField({ name, value, onChange, disabled }) {
  const def = PROFILE_FIELDS.find((f) => f.key === name);
  if (!def) return null;
  return (
    <Input
      label={def.label}
      type={def.type || 'text'}
      placeholder={def.placeholder}
      value={value || ''}
      onChange={(e) => onChange(name, e.target.value)}
      textarea={!!def.textarea}
      disabled={disabled}
    />
  );
}
