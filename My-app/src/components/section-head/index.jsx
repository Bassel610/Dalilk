import './styles.css';

export default function SectionHead({
  title,
  subtitle,
  level = 2,
  align = 'start',
  action,
  className = '',
}) {
  const Tag = `h${level}`;
  return (
    <div className={`SectionHead SectionHead--${align} ${className}`.trim()}>
      <div className="SectionHead-text">
        <Tag className="SectionHead-title">{title}</Tag>
        {subtitle ? <p className="SectionHead-subtitle">{subtitle}</p> : null}
      </div>
      {action ? <div className="SectionHead-action">{action}</div> : null}
    </div>
  );
}
