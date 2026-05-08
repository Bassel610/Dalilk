import Input from '../input';
import Button from '../button';
import { TEXT } from '../../constants/app/ui-text';
import './styles.css';

function FilterSelect({ label, value, onChange, options, disabled }) {
  const opts = (options || []).map((o) => ({ value: o.key, label: o.label }));
  return (
    <div className={`SortBox ${disabled ? 'is-disabled' : ''}`.trim()}>
      <Input
        type="select"
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        selectPlaceholder={TEXT.FILTERS.SELECT}
        options={opts}
      />
    </div>
  );
}

export default function Filter({ filters, setFilter, reset, options }) {
  const conservatives = options.conservatives || [];
  const areas = options.areasByConservative?.[filters.conservative] || [];
  const hays = options.haysByArea?.[filters.area] || [];
  const categories = options.categories || [];
  const rates = options.rates || [];

  return (
    <section className="SortSection">
      <div className="Contaner">
        <FilterSelect
          label={TEXT.FILTERS.CONSERVATIVE}
          value={filters.conservative}
          onChange={(v) => setFilter('conservative', v)}
          options={conservatives}
        />
        <FilterSelect
          label={TEXT.FILTERS.AREA}
          value={filters.area}
          onChange={(v) => setFilter('area', v)}
          options={areas}
          disabled={!filters.conservative}
        />
        <FilterSelect
          label={TEXT.FILTERS.HAY}
          value={filters.hay}
          onChange={(v) => setFilter('hay', v)}
          options={hays}
          disabled={!filters.area}
        />
        <FilterSelect
          label={TEXT.FILTERS.CATEGORY}
          value={filters.category}
          onChange={(v) => setFilter('category', v)}
          options={categories}
        />
        <FilterSelect
          label={TEXT.FILTERS.RATE}
          value={filters.rate}
          onChange={(v) => setFilter('rate', v)}
          options={rates}
        />
        <Button variant="ghost" className="RemoveAllSort" onClick={reset}>
          {TEXT.FILTERS.RESET}
        </Button>
      </div>
    </section>
  );
}
