import Button from '../button';
import { IconClose } from '../icons';
import { TEXT } from '../../constants/app/ui-text';
import { FILTER_CHIP_LABEL, FILTER_CHIPS_TEXT } from '../../constants/components/filter-chips';
import { findFilterLabel } from '../../lib/components/filter-chips';
import './styles.css';

export default function FilterChips({ filters, options, setFilter, reset }) {
  const active = Object.entries(filters).filter(([, v]) => v);
  if (active.length === 0) return null;

  return (
    <div className="FilterChips">
      <span className="FilterChips-label">{FILTER_CHIPS_TEXT.ACTIVE_LABEL}</span>
      {active.map(([k, v]) => (
        <span key={k} className="FilterChip">
          <span className="FilterChip-key">{FILTER_CHIP_LABEL[k]}:</span>
          <span>{findFilterLabel(options, k, v)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="FilterChip-x"
            onClick={() => setFilter(k, '')}
            aria-label={`Remove ${FILTER_CHIP_LABEL[k]} filter`}
          >
            <IconClose strokeWidth={3} />
          </Button>
        </span>
      ))}
      <Button variant="ghost" size="sm" className="FilterChip--clear" onClick={reset}>
        {TEXT.FILTERS.RESET}
      </Button>
    </div>
  );
}
