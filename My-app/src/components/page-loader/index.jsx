import './styles.css';

export default function PageLoader({ label = 'جاري التحميل', size = 'lg' }) {
  return (
    <div
      className={`PageLoader PageLoader--${size}`}
      role="status"
      aria-live="polite"
      aria-label={label || 'loading'}
    >
      <span className="PageLoader-glow" aria-hidden />
      <div className="PageLoader-stage" aria-hidden>
        <span className="PageLoader-ring PageLoader-ring--1" />
        <span className="PageLoader-ring PageLoader-ring--2" />
        <span className="PageLoader-ring PageLoader-ring--3" />
        <span className="PageLoader-shadow" />
        <svg className="PageLoader-pin" viewBox="0 0 24 32">
          <defs>
            <linearGradient id="pageLoaderPinGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7aa697" />
              <stop offset="0.55" stopColor="#3f6e5d" />
              <stop offset="1" stopColor="#244c3f" />
            </linearGradient>
            <linearGradient id="pageLoaderPinHi" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(255,255,255,0.45)" />
              <stop offset="0.5" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <path
            d="M12 0C5.37 0 0 5.37 0 12c0 8.5 12 20 12 20s12-11.5 12-20C24 5.37 18.63 0 12 0z"
            fill="url(#pageLoaderPinGrad)"
          />
          <path
            d="M12 0C5.37 0 0 5.37 0 12c0 8.5 12 20 12 20s12-11.5 12-20C24 5.37 18.63 0 12 0z"
            fill="url(#pageLoaderPinHi)"
          />
          <circle cx="12" cy="12" r="4.6" fill="#ffffff" />
          <circle cx="12" cy="12" r="2.2" fill="#f5b842" />
        </svg>
      </div>
      {label ? (
        <div className="PageLoader-text">
          <span className="PageLoader-label">{label}</span>
          <span className="PageLoader-bouncer" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </div>
      ) : null}
    </div>
  );
}
