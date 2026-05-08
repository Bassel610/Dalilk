import { Link } from 'react-router-dom';
import SectionHead from '../../section-head';
import { ROUTES } from '../../../constants/app/routes';
import { HEADER_CATEGORIES } from '../../../constants/components/header/categories';
import { CATEGORIES_GRID_TEXT } from '../../../constants/pages/home/components/categories-grid';
import { useCategoryCounts } from '../../../hooks/shops/use-category-counts';
import { CategoryIcon } from '../../icons';
import './styles.css';

export default function CategoriesGrid() {
  const counts = useCategoryCounts();
  const items = HEADER_CATEGORIES.filter((c) => c.key !== 'all');

  return (
    <section className="CatsGrid">
      <div className="CatsGrid-shell">
        <SectionHead
          title={CATEGORIES_GRID_TEXT.TITLE}
          subtitle={CATEGORIES_GRID_TEXT.SUBTITLE}
        />
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
                {counts[c.key]
                  ? `${counts[c.key]} ${CATEGORIES_GRID_TEXT.COUNT_SUFFIX}`
                  : CATEGORIES_GRID_TEXT.EXPLORE}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
