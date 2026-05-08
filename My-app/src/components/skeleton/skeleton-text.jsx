import Skeleton from './skeleton';

export default function SkeletonText({ lines = 3, width }) {
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
