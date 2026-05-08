import Skeleton from './skeleton';
import SkeletonText from './skeleton-text';

export default function CardSkeleton({ count = 3 }) {
  return (
    <div className="CardSkeletons">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="CardSkeleton">
          <Skeleton width="40%" height={20} />
          <SkeletonText lines={3} />
          <div className="CardSkeleton-row">
            <Skeleton width={70} height={22} radius={11} />
            <Skeleton width={70} height={22} radius={11} />
            <Skeleton width={70} height={22} radius={11} />
          </div>
        </div>
      ))}
    </div>
  );
}
