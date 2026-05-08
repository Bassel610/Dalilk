import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const VARIANT_CLASS = {
  primary: 'Btn--primary',
  secondary: 'Btn--secondary',
  outline: 'Btn--outline',
  solid: 'Btn--solid',
  ghost: 'Btn--ghost',
  danger: 'Btn--danger',
  google: 'Btn--google',
  link: 'Btn--link',
};

const SIZE_CLASS = {
  sm: 'Btn--sm',
  md: 'Btn--md',
  lg: 'Btn--lg',
};

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    to,
    href,
    type = 'button',
    loading = false,
    disabled = false,
    fullWidth = false,
    startIcon,
    endIcon,
    className = '',
    children,
    onClick,
    ...rest
  },
  ref,
) {
  const cls = [
    'Btn',
    VARIANT_CLASS[variant] || VARIANT_CLASS.primary,
    SIZE_CLASS[size] || SIZE_CLASS.md,
    loading ? 'is-loading' : '',
    fullWidth ? 'is-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading && <span className="Btn-spinner" aria-hidden="true" />}
      {!loading && startIcon ? <span className="Btn-icon">{startIcon}</span> : null}
      {children != null && <span className="Btn-label">{children}</span>}
      {!loading && endIcon ? <span className="Btn-icon">{endIcon}</span> : null}
    </>
  );

  if (to) {
    return (
      <Link
        ref={ref}
        to={to}
        className={cls}
        aria-disabled={disabled || undefined}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        {...rest}
      >
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a ref={ref} href={href} className={cls} onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button
      ref={ref}
      type={type}
      className={cls}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
});

export default Button;
