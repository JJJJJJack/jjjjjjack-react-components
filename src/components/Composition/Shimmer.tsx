interface ShimmerProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  style?: React.CSSProperties;
}

export function Shimmer({ width = "100%", height = 20, borderRadius = 4, style = {} }: ShimmerProps) {
  const wrapperStyle: React.CSSProperties = {
    width,
    height,
    borderRadius,
    ...style,
  };

  return (
    <div className="jrc-Shimmer__wrapper" style={wrapperStyle}>
      <div className="jrc-Shimmer" />
    </div>
  );
}
