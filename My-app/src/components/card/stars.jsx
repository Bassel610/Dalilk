import { IconStar } from '../icons';

export function Stars({ value }) {
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

export function StarsLight({ value }) {
  const num = Math.max(0, Math.min(5, Number(value) || 0));
  return (
    <span className="stars" aria-label={`${num} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <IconStar key={n} filled={n <= num} />
      ))}
    </span>
  );
}
