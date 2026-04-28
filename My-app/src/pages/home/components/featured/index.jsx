import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { shopsService } from '../../../../services/shops-service';
import { ROUTES } from '../../../../constants/routes';
import './styles.css';

function IconStar({ filled }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function Stars({ value }) {
  const num = Math.max(0, Math.min(5, Number(value) || 0));
  return (
    <span className="FeaturedCard-rate">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= num ? '' : 'empty'}>
          <IconStar filled={n <= num} />
        </span>
      ))}
    </span>
  );
}

export default function Featured() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await shopsService.list({ limit: 100 });
        if (cancelled) return;
        const items = Array.isArray(res) ? res : res?.items || [];
        const top = items
          .slice()
          .sort((a, b) => Number(b.rate || 0) - Number(a.rate || 0))
          .slice(0, 8);
        setShops(top);
      } catch {
        if (!cancelled) setShops([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (!loading && shops.length === 0) return null;

  return (
    <section className="Featured">
      <div className="Featured-shell">
        <div className="Featured-head">
          <div>
            <h2>الأعلى تقييماً</h2>
            <p>محلات اخترناها لك حسب تقييم المستخدمين</p>
          </div>
          <Link to={ROUTES.DETAILS} className="Featured-link">
            عرض الكل
            <IconArrow />
          </Link>
        </div>

        {loading ? (
          <div className="Featured-loading">جاري التحميل...</div>
        ) : (
          <div className="Featured-track">
            {shops.map((shop) => (
              <button
                key={shop.id}
                type="button"
                className="FeaturedCard"
                onClick={() => navigate(ROUTES.DETAILS)}
              >
                <Stars value={shop.rate} />
                <h3>{shop.Name}</h3>
                {(shop?.AddressDetiles?.Conservative || shop?.AddressDetiles?.Area) && (
                  <div className="FeaturedCard-meta">
                    <IconPin />
                    <span>
                      {[shop?.AddressDetiles?.Conservative, shop?.AddressDetiles?.Area]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </div>
                )}
                {shop.category?.length > 0 && (
                  <div className="FeaturedCard-cats">
                    {shop.category.slice(0, 3).map((c, i) => (
                      <span className="FeaturedCard-cat" key={i}>{c}</span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
