import { useState } from 'react';
import { useShops } from '../../../../hooks/use-shops';
import { useToast } from '../../../../components/toast';
import { useConfirm } from '../../../../components/confirm-dialog';
import { RowSkeleton } from '../../../../components/skeleton';
import EmptyState from '../../../../components/empty-state';
import { TEXT } from '../../../../constants/ui-text';
import './styles.css';

export default function AllShops() {
  const { shops, loading, error, remove } = useShops();
  const [search, setSearch] = useState('');
  const toast = useToast();
  const confirm = useConfirm();

  const filtered = shops.filter((s) =>
    !search ? true : (s.Name || '').includes(search),
  );

  const handleDelete = async (shop) => {
    const ok = await confirm({
      title: 'حذف المحل',
      message: `سيتم حذف "${shop.Name}" نهائياً ولا يمكن التراجع.`,
      confirmLabel: 'حذف',
      cancelLabel: 'إلغاء',
      variant: 'danger',
    });
    if (!ok) return;
    try {
      await remove(shop.id);
      toast.success(`تم حذف "${shop.Name}"`);
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (loading) {
    return <RowSkeleton count={4} />;
  }

  if (error) {
    return (
      <EmptyState title="تعذّر تحميل المحلات" description={error} />
    );
  }

  return (
    <div className="AllShopeAdmin">
      <div className="AllShopeAdmin-search">
        <input
          placeholder={TEXT.ADMIN.SEARCH + ' عن محل...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={search ? 'لا توجد نتائج' : TEXT.ADMIN.NO_SHOPS}
          description={
            search
              ? 'جرب اسم آخر أو امسح البحث.'
              : 'ابدأ بإضافة محلات لظهورها هنا.'
          }
        />
      ) : (
        <div className="AllShopeAdmin-list">
          {filtered.map((shop) => (
            <div className="AllShopeAdmin-row" key={shop.id}>
              <div className="info">
                <h3>{shop.Name}</h3>
                {(shop.Address || []).map((a, i) => (
                  <div key={i}>{TEXT.CARD.ADDRESS} {i + 1}: {a}</div>
                ))}
                {shop.LandMark && <div>{TEXT.CARD.LANDMARK}: {shop.LandMark}</div>}
                <div>
                  {TEXT.CARD.TYPE}:{' '}
                  {(shop.category || []).map((c, i) => (
                    <span className="Catigory" key={i}>{c}</span>
                  ))}
                </div>
                <div>{TEXT.CARD.RATE}: {shop.rate}</div>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(shop)}
              >
                {TEXT.ADMIN.DELETE}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
