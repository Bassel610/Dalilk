import { useEffect, useMemo, useState } from 'react';
import { useFilterOptions } from '../../hooks/shops/use-filter-options';
import Button from '../button';
import Input from '../input';
import { TEXT } from '../../constants/app/ui-text';
import { EMPTY_SHOP, SHOP_FORM_TEXT } from '../../constants/components/shop-form';
import { IconCheck, IconStar, IconPlus } from '../icons';
import './styles.css';

function StarRate({ value, onChange }) {
  const num = Number(value) || 0;
  return (
    <div className="ShopRate" role="radiogroup" aria-label="Rate">
      {[1, 2, 3, 4, 5].map((n) => (
        <Button
          key={n}
          variant="ghost"
          size="sm"
          className={`ShopRate-star ${n <= num ? 'is-on' : ''}`.trim()}
          onClick={() => onChange(String(n === num ? n - 1 : n))}
          aria-label={`${n} stars`}
        >
          <IconStar filled={n <= num} />
        </Button>
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
        <Button
          key={opt.key}
          variant="ghost"
          size="sm"
          className={`ShopChip ${set.has(opt.label) ? 'is-selected' : ''}`.trim()}
          startIcon={<IconCheck />}
          onClick={() => toggle(opt.label)}
        >
          {opt.label}
        </Button>
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
          <Input
            type={type}
            value={v || ''}
            onChange={(e) => update(i, e.target.value)}
            placeholder={`${placeholder} ${i + 1}`}
          />
          {items.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="ShopList-removeBtn"
              onClick={() => remove(i)}
              aria-label="Remove"
            >
              ×
            </Button>
          )}
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="ShopList-addBtn"
        startIcon={<IconPlus />}
        onClick={add}
      >
        {addLabel}
      </Button>
    </div>
  );
}

function buildSelectOptions(opts) {
  return (opts || []).map((o) => ({ value: o.label, label: o.label }));
}

export default function ShopForm({
  initialValue = null,
  submitLabel = TEXT.COMMON.SAVE,
  submittingLabel = TEXT.COMMON.SAVING,
  onSubmit,
  onCancel,
}) {
  const [shop, setShop] = useState(EMPTY_SHOP);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);
  const options = useFilterOptions();

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
        <h3>{SHOP_FORM_TEXT.SECTION_BASIC}</h3>
        <p className="section-hint">{SHOP_FORM_TEXT.SECTION_BASIC_HINT}</p>
        <div className="ShopForm-grid ShopForm-grid--2col">
          <Input
            label={TEXT.ADMIN.NAME}
            value={shop.Name}
            onChange={(e) => set('Name', e.target.value)}
            placeholder={SHOP_FORM_TEXT.NAME_PLACEHOLDER}
            required
          />
          <Input
            label={TEXT.CARD.LANDMARK}
            value={shop.LandMark}
            onChange={(e) => set('LandMark', e.target.value)}
            placeholder={SHOP_FORM_TEXT.LANDMARK_PLACEHOLDER}
          />
        </div>
      </section>

      <section className="ShopForm-section">
        <h3>{SHOP_FORM_TEXT.SECTION_RATE}</h3>
        <p className="section-hint">{SHOP_FORM_TEXT.SECTION_RATE_HINT}</p>
        <StarRate value={shop.rate} onChange={(v) => set('rate', v)} />
      </section>

      <section className="ShopForm-section">
        <h3>{TEXT.FILTERS.CATEGORY}</h3>
        <p className="section-hint">{SHOP_FORM_TEXT.SECTION_CATEGORY_HINT}</p>
        <Chips
          options={options.categories || []}
          value={shop.category}
          onChange={(v) => set('category', v)}
        />
      </section>

      <section className="ShopForm-section">
        <h3>{SHOP_FORM_TEXT.SECTION_LOCATION}</h3>
        <p className="section-hint">{SHOP_FORM_TEXT.SECTION_LOCATION_HINT}</p>
        <div className="ShopForm-grid">
          <Input
            type="select"
            label={TEXT.FILTERS.CONSERVATIVE}
            value={shop.AddressDetiles.Conservative}
            onChange={(e) => {
              setAddr('Conservative', e.target.value);
              setAddr('Area', '');
              setAddr('Hay', '');
            }}
            selectPlaceholder={TEXT.FILTERS.SELECT}
            options={buildSelectOptions(conservativeOptions)}
          />
          <Input
            type="select"
            label={TEXT.FILTERS.AREA}
            value={shop.AddressDetiles.Area}
            onChange={(e) => {
              setAddr('Area', e.target.value);
              setAddr('Hay', '');
            }}
            disabled={!shop.AddressDetiles.Conservative}
            selectPlaceholder={TEXT.FILTERS.SELECT}
            options={buildSelectOptions(areaOptions)}
          />
          <Input
            type="select"
            label={TEXT.FILTERS.HAY}
            value={shop.AddressDetiles.Hay}
            onChange={(e) => setAddr('Hay', e.target.value)}
            disabled={!shop.AddressDetiles.Area}
            selectPlaceholder={TEXT.FILTERS.SELECT}
            options={buildSelectOptions(hayOptions)}
          />
        </div>
      </section>

      <section className="ShopForm-section">
        <h3>{SHOP_FORM_TEXT.SECTION_ADDRESSES}</h3>
        <p className="section-hint">{SHOP_FORM_TEXT.SECTION_ADDRESSES_HINT}</p>
        <ListInputs
          items={shop.Address}
          onChange={(v) => set('Address', v)}
          placeholder={SHOP_FORM_TEXT.ADDRESS_PLACEHOLDER}
          addLabel={SHOP_FORM_TEXT.ADD_ADDRESS_LABEL}
        />
      </section>

      <section className="ShopForm-section">
        <h3>{SHOP_FORM_TEXT.SECTION_LINKS}</h3>
        <p className="section-hint">{SHOP_FORM_TEXT.SECTION_LINKS_HINT}</p>
        <ListInputs
          items={shop.location}
          onChange={(v) => set('location', v)}
          placeholder={SHOP_FORM_TEXT.LINK_PLACEHOLDER}
          addLabel={SHOP_FORM_TEXT.ADD_LINK_LABEL}
          type="url"
        />
      </section>

      <div className="ShopForm-footer">
        {msg && <span className={`msg ${msg.type}`}>{msg.text}</span>}
        {onCancel && (
          <Button variant="ghost" disabled={submitting} onClick={onCancel}>
            {TEXT.COMMON.CANCEL}
          </Button>
        )}
        <Button type="submit" variant="primary" loading={submitting}>
          {submitting ? submittingLabel : submitLabel}
        </Button>
      </div>
    </form>
  );
}
