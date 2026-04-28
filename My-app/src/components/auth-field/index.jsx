import { useState } from 'react';
import { IconEye } from '../icons';

export default function AuthField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon,
  required,
  minLength,
  autoComplete,
  togglePassword = false,
}) {
  const [show, setShow] = useState(false);
  const isPw = type === 'password';
  const inputType = isPw && togglePassword && show ? 'text' : type;

  return (
    <div className="auth-field">
      {label && <label>{label}</label>}
      <div className="auth-field-input">
        {icon}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          className={togglePassword ? 'has-toggle' : ''}
        />
        {togglePassword && (
          <button
            type="button"
            className="auth-toggle-btn"
            onClick={() => setShow((s) => !s)}
            tabIndex={-1}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            <IconEye off={show} />
          </button>
        )}
      </div>
    </div>
  );
}
