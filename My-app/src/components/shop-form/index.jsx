import { useEffect, useMemo, useState } from 'react';
import { useFilterOptions } from '../../hooks/use-filter-options';
import { TEXT } from '../../constants/ui-text';
import './styles.css';

const emptyShop = {
  Name: '',
  LandMark: '',
  rate: '',
  category: [],
  Address: [''],
  location: [''],
  AddressDetiles: { Conservative: '', Area: '', Hay: '' },
};

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconStar({ filled }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function StarRate({ value, onChange }) {
  const num = Number(value) || 0;
  return (
    <div className="ShopRate" role="radiogroup" aria-label="Rate">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          className={n <= num ? 'is-on' : ''}
          onClick={() => onChange(String(n === num ? n - 1 : n))}
          aria-label={`${n} stars`}
        >
          <IconStar filled={n <= num} />
        </button>
      ))}
      <span className="ShopRate-label">{num ? `${num}/5` : '—'}</span>
    </div>
  );
}

function Chips({ options, value, onChange }) {
  const set = new Set(value || []);
  const toggle = (label) => {
    const next = new Set(set);
    if (next.has(label)) next.delete(label);
    else next.add(label);
    onChange([...next]);
  };
  return (
    <div className="ShopChips">
      {options.map((opt) => (
        <button
          type="button"
          key={opt.key}
          className={`ShopChip ${set.has(opt.label) ? 'is-selected' : ''}`.trim()}
          onClick={() => toggle(opt.label)}
        >
          <IconCheck />
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ListInputs({ items, onChange, placeholder, addLabel, type = 'text' }) {
  const update = (i, v) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, '']);

  return (
    <div className="ShopList">
      {items.map((v, i) => (
        <div className="ShopList-row" key={i}>
          <input
            type={type}
            value={v || ''}
            onChange={(e) => update(i, e.target.value)}
            placeholder={`${placeholder} ${i + 1}`}
          />
          {items.length > 1 && (
            <button type="button" className="ShopList-removeBtn" onClick={() => remove(i)} aria-label="Remove">×</button>
          )}
        </div>
      ))}
      <button type="button" className="ShopList-addBtn" onClick={add}>
        <IconPlus /> {addLabel}
      </button>
    </div>
  );
}

export default function ShopForm({
  initialValue = null,
  submitLabel = TEXT.COMMON.SAVE,
  submittingLabel = TEXT.COMMON.SAVING,
  onSubmit,
  onCancel,
}) {
  const [shop, setShop] = useState(emptyShop);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);
  const options = useFilterOptions();

  // hydrate when initialValue arrives
  useEffect(() => {
    if (initialValue) {
      setShop({
        Name: initialValue.Name || '',
        LandMark: initialValue.LandMark || '',
        rate: initialValue.rate || '',
        category: initialValue.category || [],
        Address: initialValue.Address?.length ? initialValue.Address : [''],
        location: initialValue.location?.length ? initialValue.location : [''],
        AddressDetiles: {
          Conservative: initialValue.AddressDetiles?.Conservative || '',
          Area: initialValue.AddressDetiles?.Area || '',
          Hay: initialValue.AddressDetiles?.Hay || '',
        },
      });
      setMsg(null);
    }
  }, [initialValue?.id]);

  const set = (k, v) => {
    setShop((p) => ({ ...p, [k]: v }));
    setMsg(null);
  };
  const setAddr = (k, v) => {
    setShop((p) => ({ ...p, AddressDetiles: { ...p.AddressDetiles, [k]: v } }));
    setMsg(null);
  };

  // resolve dependent dropdowns by Arabic label, since shop docs store labels
  const conservativeOptions = options.conservatives || [];
  const areaOptions = useMemo(() => {
    const cons = conservativeOptions.find((c) => c.label === shop.AddressDetiles.Conservative);
    if (!cons) return options.areas || [];
    return options.areasByConservative?.[cons.key] || [];
  }, [options, shop.AddressDetiles.Conservative, conservativeOptions]);

  const hayOptions = useMemo(() => {
    const area = areaOptions.find((a) => a.label === shop.AddressDetiles.Area);
    if (!area) return options.hays || [];
    return options.haysByArea?.[area.key] || [];
  }, [options, shop.AddressDetiles.Area, areaOptions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setSubmitting(true);
    try {
      const payload = {
        ...shop,
        category: shop.category.filter((c) => c?.trim()),
        Address: shop.Address.filter((a) => a?.trim()),
        location: shop.location.filter((l) => l?.trim()),
      };
      await onSubmit(payload);
      setMsg({ type: 'success', text: TEXT.COMMON.SAVED });
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="ShopForm" onSubmit={handleSubmit}>
      <section className="ShopForm-section">
        <h3>المعلومات الأساسية</h3>
        <p className="section-hint">اسم المحل وعلامة مميزة قريبة منه</p>
        <div className="ShopForm-grid ShopForm-grid--2col">
          <div className="ShopField">
            <label>{TEXT.ADMIN.NAME}</label>
            <input
              value={shop.Name}
              onChange={(e) => set('Name', e.target.value)}
              placeholder="مثلاً: سوبر ماركت النور"
              required
            />
          </div>
          <div className="ShopField">
            <label>{TEXT.CARD.LANDMARK}</label>
            <input
              value={shop.LandMark}
              onChange={(e) => set('LandMark', e.target.value)}
              placeholder="بجوار مسجد، أمام المول..."
            />
          </div>
        </div>
      </section>

      <section className="ShopForm-section">
        <h3>التقييم</h3>
        <p className="section-hint">من 1 إلى 5 نجوم</p>
        <StarRate value={shop.rate} onChange={(v) => set('rate', v)} />
      </section>

      <section className="ShopForm-section">
        <h3>{TEXT.FILTERS.CATEGORY}</h3>
        <p className="section-hint">اختر تصنيف واحد أو أكثر</p>
        <Chips
          options={options.categories || []}
          value={shop.category}
          onChange={(v) => set('category', v)}
        />
      </section>

      <section className="ShopForm-section">
        <h3>الموقع الجغرافي</h3>
        <p className="section-hint">المحافظة ثم المنطقة ثم الحي</p>
        <div className="ShopForm-grid">
          <div className="ShopField">
            <label>{TEXT.FILTERS.CONSERVATIVE}</label>
            <select
              value={shop.AddressDetiles.Conservative}
              onChange={(e) => {
                setAddr('Conservative', e.target.value);
                setAddr('Area', '');
                setAddr('Hay', '');
              }}
            >
              <option value="">{TEXT.FILTERS.SELECT}</option>
              {conservativeOptions.map((c) => (
                <option key={c.key} value={c.label}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className="ShopField">
            <label>{TEXT.FILTERS.AREA}</label>
            <select
              value={shop.AddressDetiles.Area}
              onChange={(e) => {
                setAddr('Area', e.target.value);
                setAddr('Hay', '');
              }}
              disabled={!shop.AddressDetiles.Conservative}
            >
              <option value="">{TEXT.FILTERS.SELECT}</option>
              {areaOptions.map((a) => (
                <option key={a.key} value={a.label}>{a.label}</option>
              ))}
            </select>
          </div>
          <div className="ShopField">
            <label>{TEXT.FILTERS.HAY}</label>
            <select
              value={shop.AddressDetiles.Hay}
              onChange={(e) => setAddr('Hay', e.target.value)}
              disabled={!shop.AddressDetiles.Area}
            >
              <option value="">{TEXT.FILTERS.SELECT}</option>
              {hayOptions.map((h) => (
                <option key={h.key} value={h.label}>{h.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="ShopForm-section">
        <h3>العناوين التفصيلية</h3>
        <p className="section-hint">يمكنك إضافة أكثر من عنوان (فرع، شارع...)</p>
        <ListInputs
          items={shop.Address}
          onChange={(v) => set('Address', v)}
          placeholder="عنوان"
          addLabel="إضافة عنوان"
        />
      </section>

      <section className="ShopForm-section">
        <h3>روابط الموقع</h3>
        <p className="section-hint">روابط Google Maps أو OpenStreetMap</p>
        <ListInputs
          items={shop.location}
          onChange={(v) => set('location', v)}
          placeholder="رابط"
          addLabel="إضافة رابط"
          type="url"
        />
      </section>

      <div className="ShopForm-footer">
        {msg && <span className={`msg ${msg.type}`}>{msg.text}</span>}
        {onCancel && (
          <button
            type="button"
            className="ShopBtn ShopBtn--ghost"
            onClick={onCancel}
            disabled={submitting}
          >
            {TEXT.COMMON.CANCEL}
          </button>
        )}
        <button
          type="submit"
          className="ShopBtn ShopBtn--primary"
          disabled={submitting}
        >
          {submitting && <span className="spinner" />}
          {submitting ? submittingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
}
