import { useState, useMemo } from 'react';
import ShopForm from '../../shop-form';
import Input from '../../input';
import Button from '../../button';
import { useShopsList } from '../../../hooks/shops/use-shops-list';
import { useUpdateShop } from '../../../hooks/shops/use-update-shop';
import { useDebounce } from '../../../hooks/use-debounce';
import { TEXT } from '../../../constants/app/ui-text';
import { EDIT_SHOP_TEXT } from '../../../constants/pages/dashboard';
import './styles.css';

export default function EditShop() {
  const { shops, loading, reload } = useShopsList();
  const { updateShop } = useUpdateShop({ onSuccess: () => reload() });
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
    await updateShop(selected.id, payload);
  };

  return (
    <div className="EditShop">
      <div className="EditShop-search">
        <Input
          placeholder={EDIT_SHOP_TEXT.SEARCH_PLACEHOLDER}
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
        <div className="EditShop-status">{EDIT_SHOP_TEXT.NO_MATCH}</div>
      ) : !selected && matches.length > 0 ? (
        <div className="EditShop-results">
          {matches.map((s) => (
            <Button
              key={s.id}
              variant="ghost"
              className="EditShop-result"
              onClick={() => setSelectedId(s.id)}
            >
              <span className="name">{s.Name}</span>
              <span className="meta">
                {s?.AddressDetiles?.Conservative} · {s?.AddressDetiles?.Area}
              </span>
            </Button>
          ))}
        </div>
      ) : !selected ? (
        <div className="EditShop-status hint">{EDIT_SHOP_TEXT.HINT}</div>
      ) : null}

      {selected && (
        <>
          <div className="EditShop-selected">
            {EDIT_SHOP_TEXT.EDITING} <strong>{selected.Name}</strong>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedId(null);
                setSearch('');
              }}
            >
              {EDIT_SHOP_TEXT.CHOOSE_OTHER}
            </Button>
          </div>
          <ShopForm
            initialValue={selected}
            submitLabel={TEXT.ADMIN.UPDATE}
            submittingLabel={EDIT_SHOP_TEXT.SAVING_LABEL}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
}
