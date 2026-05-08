import { useState } from 'react';
import Card from './card';
import ShopDetail from './shop-detail';
import { TEXT } from '../../constants/app/ui-text';

export default function CardsList({ shops, emptyText }) {
  const [active, setActive] = useState(null);

  if (shops.length === 0) {
    return (
      <div className="Cards">
        <div className="Contaner">
          <div className="Cards-empty">{emptyText || TEXT.CARD.NOT_FOUND}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="Cards">
        <div className="Contaner">
          {shops.map((shop, i) => (
            <Card
              key={shop.id ?? i}
              shop={shop}
              onOpen={(s) => setActive(s)}
            />
          ))}
        </div>
      </div>
      {active && <ShopDetail shop={active} onClose={() => setActive(null)} />}
    </>
  );
}
