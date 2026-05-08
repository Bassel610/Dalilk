import { useState } from 'react';
import { useShopsList } from '../../../hooks/shops/use-shops-list';
import { useDeleteShop } from '../../../hooks/shops/use-delete-shop';
import { RowSkeleton } from '../../skeleton';
import EmptyState from '../../empty-state';
import Input from '../../input';
import Button from '../../button';
import { TEXT } from '../../../constants/app/ui-text';
import { ALL_SHOPS_TEXT } from '../../../constants/pages/dashboard';
import './styles.css';

export default function AllShops() {
  const { shops, loading, error, removeLocal } = useShopsList();
  const { deleteShop } = useDeleteShop({
    onSuccess: (shop) => removeLocal(shop.id),
  });
  const [search, setSearch] = useState('');

  const filtered = shops.filter((s) =>
    !search ? true : (s.Name || '').includes(search),
  );

  if (loading) {
    return <RowSkeleton count={4} />;
  }

  if (error) {
    return <EmptyState title={ALL_SHOPS_TEXT.ERROR_TITLE} description={error} />;
  }

  return (
    <div className="AllShopeAdmin">
      <div className="AllShopeAdmin-search">
        <Input
          placeholder={ALL_SHOPS_TEXT.SEARCH_PLACEHOLDER}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={search ? ALL_SHOPS_TEXT.EMPTY_RESULTS : TEXT.ADMIN.NO_SHOPS}
          description={
            search
              ? ALL_SHOPS_TEXT.EMPTY_RESULTS_DESC
              : ALL_SHOPS_TEXT.EMPTY_INITIAL_DESC
          }
        />
      ) : (
        <div className="AllShopeAdmin-list">
          {filtered.map((shop) => (
            <div className="AllShopeAdmin-row" key={shop.id}>
              <div className="info">
                <h3>{shop.Name}</h3>
                {(shop.Address || []).map((a, i) => (
                  <div key={i}>
                    {TEXT.CARD.ADDRESS} {i + 1}: {a}
                  </div>
                ))}
                {shop.LandMark && <div>{TEXT.CARD.LANDMARK}: {shop.LandMark}</div>}
                <div>
                  {TEXT.CARD.TYPE}:{' '}
                  {(shop.category || []).map((c, i) => (
                    <span className="Catigory" key={i}>{c}</span>
                  ))}
                </div>
                <div>
                  {TEXT.CARD.RATE}: {shop.rate}
                </div>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => deleteShop(shop)}
              >
                {TEXT.ADMIN.DELETE}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
