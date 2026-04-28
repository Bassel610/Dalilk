import './styles.css';

export function Skeleton({ width, height = 14, radius = 6, style }) {
  return (
    <span
      className="Skeleton"
      style={{
        width: width ?? '100%',
        height,
        borderRadius: radius,
        ...style,
      }}
    />
  );
}

export function SkeletonText({ lines = 3, width }) {
  return (
    <div className="SkeletonText">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? width || '60%' : '100%'}
          height={12}
        />
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 3 }) {
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

export function RowSkeleton({ count = 4 }) {
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
