import { TEXT } from '../../constants/ui-text';
import './styles.css';

function Select({ label, value, onChange, options, disabled }) {
  return (
    <div className={`SortBox ${disabled ? 'is-disabled' : ''}`.trim()}>
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">{TEXT.FILTERS.SELECT}</option>
        {options.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.label}
          </option>
        ))}
      </select>
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
        <Select
          label={TEXT.FILTERS.CONSERVATIVE}
          value={filters.conservative}
          onChange={(v) => setFilter('conservative', v)}
          options={conservatives}
        />
        <Select
          label={TEXT.FILTERS.AREA}
          value={filters.area}
          onChange={(v) => setFilter('area', v)}
          options={areas}
          disabled={!filters.conservative}
        />
        <Select
          label={TEXT.FILTERS.HAY}
          value={filters.hay}
          onChange={(v) => setFilter('hay', v)}
          options={hays}
          disabled={!filters.area}
        />
        <Select
          label={TEXT.FILTERS.CATEGORY}
          value={filters.category}
          onChange={(v) => setFilter('category', v)}
          options={categories}
        />
        <Select
          label={TEXT.FILTERS.RATE}
          value={filters.rate}
          onChange={(v) => setFilter('rate', v)}
          options={rates}
        />
        <button type="button" className="RemoveAllSort" onClick={reset}>
          {TEXT.FILTERS.RESET}
        </button>
      </div>
    </section>
  );
}
