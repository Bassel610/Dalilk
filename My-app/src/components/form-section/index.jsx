import './styles.css';

export default function FormSection({
  title,
  hint,
  layout = 'grid',
  className = '',
  bodyClassName = '',
  actions,
  children,
}) {
  const bodyCls = [
    'FormSection-body',
    `FormSection-body--${layout}`,
    bodyClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={`FormSection ${className}`.trim()}>
      {(title || hint) && (
        <header className="FormSection-head">
          {title && <h3 className="FormSection-title">{title}</h3>}
          {hint && <p className="FormSection-hint">{hint}</p>}
        </header>
      )}
      <div className={bodyCls}>{children}</div>
      {actions ? <div className="FormSection-actions">{actions}</div> : null}
    </section>
  );
}
