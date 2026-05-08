import { Stars } from './stars';
import { IconPin } from '../icons';

export default function Card({ shop, onOpen }) {
  const conservative = shop?.AddressDetiles?.Conservative;
  const area = shop?.AddressDetiles?.Area;
  const cats = shop.category?.length > 0 ? shop.category.slice(0, 4) : [];

  return (
    <div
      className="Card"
      onClick={() => onOpen?.(shop)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onOpen?.(shop);
      }}
    >
      <div className="Card-head">
        <h3 className="Title">{shop.Name}</h3>
        {shop.rate && <Stars value={shop.rate} />}
      </div>
      {(conservative || area) && (
        <div className="Card-meta">
          <IconPin />
          <span>{[conservative, area].filter(Boolean).join(' · ')}</span>
        </div>
      )}
      {cats.length > 0 && (
        <div className="Card-cats">
          {cats.map((c, i) => (
            <span className="Card-cat" key={i}>
              {c}
            </span>
          ))}
        </div>
      )}
      {shop.LandMark && <div className="Card-landmark">{shop.LandMark}</div>}
    </div>
  );
}
