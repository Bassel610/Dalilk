import { useEffect, useState } from 'react';
import { TEXT } from '../../constants/ui-text';
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
function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconExternal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function Stars({ value }) {
  const num = Math.max(0, Math.min(5, Number(value) || 0));
  return (
    <span className="Card-rate" aria-label={`${num} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= num ? '' : 'empty'}>
          <IconStar filled={n <= num} />
        </span>
      ))}
    </span>
  );
}

function StarsLight({ value }) {
  const num = Math.max(0, Math.min(5, Number(value) || 0));
  return (
    <span className="stars" aria-label={`${num} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <IconStar key={n} filled={n <= num} />
      ))}
    </span>
  );
}

function ShopDetail({ shop, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const conservative = shop?.AddressDetiles?.Conservative;
  const area = shop?.AddressDetiles?.Area;
  const hay = shop?.AddressDetiles?.Hay;

  return (
    <div
      className="ShopDetail-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="ShopDetail" role="dialog" aria-modal="true">
        <div className="ShopDetail-header">
          <button type="button" className="ShopDetail-close" onClick={onClose} aria-label="Close">
            <IconClose />
          </button>
          <h2>{shop.Name}</h2>
          {shop.rate && <StarsLight value={shop.rate} />}
        </div>
        <div className="ShopDetail-body">
          {(conservative || area || hay) && (
            <div className="ShopDetail-section">
              <h4>الموقع</h4>
              <p>
                {[conservative, area, hay].filter(Boolean).join(' · ')}
              </p>
            </div>
          )}
          {shop.LandMark && (
            <div className="ShopDetail-section">
              <h4>{TEXT.CARD.LANDMARK}</h4>
              <p>{shop.LandMark}</p>
            </div>
          )}
          {(shop.Address || []).length > 0 && (
            <div className="ShopDetail-section">
              <h4>{TEXT.CARD.ADDRESS}</h4>
              <ul>
                {shop.Address.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          )}
          {shop.category?.length > 0 && (
            <div className="ShopDetail-section">
              <h4>{TEXT.CARD.TYPE}</h4>
              <div className="ShopDetail-cats">
                {shop.category.map((c, i) => <span key={i}>{c}</span>)}
              </div>
            </div>
          )}
          {(shop.location || []).length > 0 && (
            <div className="ShopDetail-section">
              <h4>{TEXT.CARD.LOCATION}</h4>
              {shop.location.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ShopDetail-mapBtn"
                  style={{ marginInlineStart: i ? 8 : 0 }}
                >
                  <IconPin /> فتح الموقع {shop.location.length > 1 ? `${i + 1}` : ''}
                  <IconExternal />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Card({ shop, onOpen }) {
  const conservative = shop?.AddressDetiles?.Conservative;
  const area = shop?.AddressDetiles?.Area;

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
      {shop.category?.length > 0 && (
        <div className="Card-cats">
          {shop.category.slice(0, 4).map((c, i) => (
            <span className="Card-cat" key={i}>{c}</span>
          ))}
        </div>
      )}
      {shop.LandMark && <div className="Card-landmark">{shop.LandMark}</div>}
    </div>
  );
}

export function CardsList({ shops, emptyText }) {
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
