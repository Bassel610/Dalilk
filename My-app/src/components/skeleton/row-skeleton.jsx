import Skeleton from './skeleton';

export default function RowSkeleton({ count = 4 }) {
  return (
    <div className="RowSkeletons">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="RowSkeleton">
          <Skeleton width="35%" height={18} />
          <Skeleton width="60%" height={12} />
          <Skeleton width="50%" height={12} />
        </div>
      ))}
    </div>
  );
}
