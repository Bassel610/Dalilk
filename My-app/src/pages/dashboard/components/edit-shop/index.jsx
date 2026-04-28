import { useState, useMemo } from 'react';
import ShopForm from '../../../../components/shop-form';
import { useShops } from '../../../../hooks/use-shops';
import { useDebounce } from '../../../../hooks/use-debounce';
import { useToast } from '../../../../components/toast';
import { TEXT } from '../../../../constants/ui-text';
import './styles.css';

export default function EditShop() {
  const { shops, loading, update } = useShops();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const debouncedSearch = useDebounce(search, 200);

  const matches = useMemo(() => {
    if (!debouncedSearch) return [];
    return shops.filter((s) => (s.Name || '').includes(debouncedSearch));
  }, [shops, debouncedSearch]);

  const selected = shops.find((s) => s.id === selectedId) || null;

  const handleSubmit = async (payload) => {
    if (!selected) throw new Error('No shop selected');
    await update(selected.id, payload);
    toast.success(`تم حفظ تعديلات "${payload.Name}"`);
  };

  return (
    <div className="EditShop">
      <div className="EditShop-search">
        <input
          placeholder={TEXT.ADMIN.SEARCH + ' عن محل بالاسم'}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedId(null);
          }}
        />
      </div>

      {loading ? (
        <div className="EditShop-status">{TEXT.COMMON.LOADING}</div>
      ) : !selected && search && matches.length === 0 ? (
        <div className="EditShop-status">لا يوجد محل بهذا الاسم</div>
      ) : !selected && matches.length > 0 ? (
        <div className="EditShop-results">
          {matches.map((s) => (
            <button
              type="button"
              key={s.id}
              className="EditShop-result"
              onClick={() => setSelectedId(s.id)}
            >
              <span className="name">{s.Name}</span>
              <span className="meta">
                {s?.AddressDetiles?.Conservative} · {s?.AddressDetiles?.Area}
              </span>
            </button>
          ))}
        </div>
      ) : !selected ? (
        <div className="EditShop-status hint">
          ابحث عن محل بالأعلى لاختياره وتعديل بياناته
        </div>
      ) : null}

      {selected && (
        <>
          <div className="EditShop-selected">
            تعديل: <strong>{selected.Name}</strong>
            <button
              type="button"
              className="EditShop-clear"
              onClick={() => {
                setSelectedId(null);
                setSearch('');
              }}
            >
              اختيار محل آخر
            </button>
          </div>
          <ShopForm
            initialValue={selected}
            submitLabel={TEXT.ADMIN.UPDATE}
            submittingLabel="جاري الحفظ..."
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
}
