import { TEXT } from '../../constants/ui-text';
import './styles.css';

const KEY_LABEL = {
  conservative: TEXT.FILTERS.CONSERVATIVE,
  area: TEXT.FILTERS.AREA,
  hay: TEXT.FILTERS.HAY,
  category: TEXT.FILTERS.CATEGORY,
  rate: TEXT.FILTERS.RATE,
};

function findLabel(options, kind, key) {
  if (kind === 'rate') return key;
  if (kind === 'conservative') return options.conservatives?.find((o) => o.key === key)?.label || key;
  if (kind === 'area') return options.areas?.find((o) => o.key === key)?.label || key;
  if (kind === 'hay') return options.hays?.find((o) => o.key === key)?.label || key;
  if (kind === 'category') return options.categories?.find((o) => o.key === key)?.label || key;
  return key;
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function FilterChips({ filters, options, setFilter, reset }) {
  const active = Object.entries(filters).filter(([, v]) => v);
  if (active.length === 0) return null;

  return (
    <div className="FilterChips">
      <span className="FilterChips-label">المفعّل:</span>
      {active.map(([k, v]) => (
        <span key={k} className="FilterChip">
          <span className="FilterChip-key">{KEY_LABEL[k]}:</span>
          <span>{findLabel(options, k, v)}</span>
          <button
            type="button"
            className="FilterChip-x"
            onClick={() => setFilter(k, '')}
            aria-label={`Remove ${KEY_LABEL[k]} filter`}
          >
            <IconX />
          </button>
        </span>
      ))}
      <button type="button" className="FilterChip--clear" onClick={reset}>
        {TEXT.FILTERS.RESET}
      </button>
    </div>
  );
}
