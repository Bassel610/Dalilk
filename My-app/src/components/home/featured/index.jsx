import { useNavigate } from 'react-router-dom';
import FeaturedHead from './featured-head';
import FeaturedCard from './featured-card';
import { ROUTES } from '../../../constants/app/routes';
import { FEATURED_TEXT } from '../../../constants/pages/home/components/featured';
import { useFeaturedShops } from '../../../hooks/shops/use-featured-shops';
import './styles.css';

export default function Featured() {
  const { shops, loading } = useFeaturedShops();
  const navigate = useNavigate();

  if (!loading && shops.length === 0) return null;

  return (
    <section className="Featured">
      <div className="Featured-shell">
        <FeaturedHead />
        {loading ? (
          <div className="Featured-loading">{FEATURED_TEXT.LOADING}</div>
        ) : (
          <div className="Featured-track">
            {shops.map((shop) => (
              <FeaturedCard
                key={shop.id}
                shop={shop}
                onClick={() => navigate(ROUTES.DETAILS)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
