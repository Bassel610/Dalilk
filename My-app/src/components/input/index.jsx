import { forwardRef, useId, useState } from 'react';
import { IconEye } from '../icons';
import './styles.css';

const Input = forwardRef(function Input(
  {
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    icon,
    error,
    hint,
    required,
    minLength,
    maxLength,
    autoComplete,
    disabled,
    readOnly,
    togglePassword = false,
    textarea = false,
    rows = 4,
    options = [],
    selectPlaceholder,
    className = '',
    inputClassName = '',
    id: idProp,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp || generatedId;
  const [show, setShow] = useState(false);
  const isPw = type === 'password';
  const isSelect = type === 'select';
  const resolvedType = isPw && togglePassword && show ? 'text' : type;

  const fieldClass = [
    'Field',
    icon ? 'Field--with-icon' : '',
    togglePassword && isPw ? 'Field--with-toggle' : '',
    isSelect ? 'Field--select' : '',
    error ? 'is-error' : '',
    disabled ? 'is-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputCls = ['Field-input', inputClassName].filter(Boolean).join(' ');

  let control;
  if (isSelect) {
    control = (
      <select
        ref={ref}
        id={id}
        className={inputCls}
        value={value ?? ''}
        onChange={onChange}
        required={required}
        disabled={disabled}
        {...rest}
      >
        {selectPlaceholder !== undefined && (
          <option value="">{selectPlaceholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value ?? opt.key} value={opt.value ?? opt.key}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  } else if (textarea) {
    control = (
      <textarea
        ref={ref}
        id={id}
        className={inputCls}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        {...rest}
      />
    );
  } else {
    control = (
      <input
        ref={ref}
        id={id}
        type={resolvedType}
        className={inputCls}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        disabled={disabled}
        readOnly={readOnly}
        {...rest}
      />
    );
  }

  return (
    <div className={fieldClass}>
      {label && (
        <label htmlFor={id} className="Field-label">
          {label}
        </label>
      )}
      <div className="Field-control">
        {icon ? <span className="Field-icon">{icon}</span> : null}
        {control}
        {togglePassword && isPw ? (
          <button
            type="button"
            className="Field-toggle"
            onClick={() => setShow((s) => !s)}
            tabIndex={-1}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            <IconEye off={show} />
          </button>
        ) : null}
      </div>
      {error ? <span className="Field-error">{error}</span> : null}
      {!error && hint ? <span className="Field-hint">{hint}</span> : null}
    </div>
  );
});

export default Input;
