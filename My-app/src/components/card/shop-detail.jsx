import { useEffect } from 'react';
import Button from '../button';
import { TEXT } from '../../constants/app/ui-text';
import { StarsLight } from './stars';
import { IconClose, IconPin, IconExternal } from '../icons';

export default function ShopDetail({ shop, onClose }) {
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
          <Button
            variant="ghost"
            size="sm"
            className="ShopDetail-close"
            onClick={onClose}
            aria-label="Close"
          >
            <IconClose />
          </Button>
          <h2>{shop.Name}</h2>
          {shop.rate && <StarsLight value={shop.rate} />}
        </div>
        <div className="ShopDetail-body">
          {(conservative || area || hay) && (
            <div className="ShopDetail-section">
              <h4>الموقع</h4>
              <p>{[conservative, area, hay].filter(Boolean).join(' · ')}</p>
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
                {shop.Address.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
          {shop.category?.length > 0 && (
            <div className="ShopDetail-section">
              <h4>{TEXT.CARD.TYPE}</h4>
              <div className="ShopDetail-cats">
                {shop.category.map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
              </div>
            </div>
          )}
          {(shop.location || []).length > 0 && (
            <div className="ShopDetail-section">
              <h4>{TEXT.CARD.LOCATION}</h4>
              {shop.location.map((url, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ShopDetail-mapBtn"
                  style={{ marginInlineStart: i ? 8 : 0 }}
                  startIcon={<IconPin />}
                  endIcon={<IconExternal />}
                >
                  فتح الموقع {shop.location.length > 1 ? `${i + 1}` : ''}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
