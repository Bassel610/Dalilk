export default function Skeleton({ width, height = 14, radius = 6, style }) {
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
