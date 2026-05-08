import { IconStar } from '../../icons';

export default function Stars({ value }) {
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
