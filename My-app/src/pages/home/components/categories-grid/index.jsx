import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { shopsService } from '../../../../services/shops-service';
import { ROUTES } from '../../../../constants/routes';
import { HEADER_CATEGORIES } from '../../../../constants/categories';
import CategoryIcon from '../../../../components/header/category-icons';
import './styles.css';

export default function CategoriesGrid() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await shopsService.list({ limit: 100 });
        if (cancelled) return;
        const shops = Array.isArray(res) ? res : res?.items || [];
        const byKey = {};
        shops.forEach((s) => {
          (s.category || []).forEach((c) => {
            byKey[c] = (byKey[c] || 0) + 1;
          });
        });
        // map Arabic label → key
        const labelToKey = {
          بقاله: 'grocery',
          خضاري: 'vegetables',
          خضار: 'vegetables',
          فرارجي: 'poultry',
          جزارين: 'butchers',
          عطارين: 'herbs',
          مطاعم: 'restaurants',
        };
        const out = {};
        Object.entries(byKey).forEach(([label, n]) => {
          const k = labelToKey[label];
          if (k) out[k] = (out[k] || 0) + n;
        });
        setCounts(out);
      } catch {
        /* keep counts empty */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const items = HEADER_CATEGORIES.filter((c) => c.key !== 'all');

  return (
    <section className="CatsGrid">
      <div className="CatsGrid-shell">
        <div className="CatsGrid-head">
          <h2>تصفح حسب التصنيف</h2>
          <p>اختر تصنيف لاكتشاف المحلات المختصة فيه</p>
        </div>
        <div className="CatsGrid-list">
          {items.map((c) => (
            <Link
              key={c.key}
              to={`${ROUTES.DETAILS}?category=${c.key}`}
              className="CatsGrid-item"
            >
              <div className="CatsGrid-icon">
                <CategoryIcon name={c.icon} />
              </div>
              <h3 className="CatsGrid-label">{c.label}</h3>
              <p className="CatsGrid-count">
                {counts[c.key] ? `${counts[c.key]} محل` : 'استكشف'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
