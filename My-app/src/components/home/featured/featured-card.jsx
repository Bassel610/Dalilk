import Button from '../../button';
import Stars from './stars';
import { IconPin } from '../../icons';

export default function FeaturedCard({ shop, onClick }) {
  const conservative = shop?.AddressDetiles?.Conservative;
  const area = shop?.AddressDetiles?.Area;
  const showLocation = conservative || area;
  const cats = shop.category?.length > 0 ? shop.category.slice(0, 3) : [];

  return (
    <Button variant="ghost" className="FeaturedCard" onClick={onClick}>
      <span className="FeaturedCard-body">
        <Stars value={shop.rate} />
        <h3>{shop.Name}</h3>
        {showLocation ? (
          <span className="FeaturedCard-meta">
            <IconPin />
            <span>{[conservative, area].filter(Boolean).join(' · ')}</span>
          </span>
        ) : null}
        {cats.length > 0 ? (
          <span className="FeaturedCard-cats">
            {cats.map((c, i) => (
              <span className="FeaturedCard-cat" key={i}>{c}</span>
            ))}
          </span>
        ) : null}
      </span>
    </Button>
  );
}
