type GridProps = {
  className?: string;
  noHighlight?: boolean;
  children: any;
};
export function Grid({ className = "", noHighlight = false, children }: GridProps) {
  return (
    <div className={`jrc-Grid ${className}`} data-no-highlight={noHighlight || undefined}>
      {children}
    </div>
  );
}
