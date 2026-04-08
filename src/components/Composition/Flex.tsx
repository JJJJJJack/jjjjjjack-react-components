type FlexProps = {
  className?: string;
  col?: boolean;
  noGap?: boolean;
  justify?:
    | "normal"
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch";
  items?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  children: any;
};

export function Flex({ className = "", col, noGap, justify, items, children }: FlexProps) {
  return (
    <div
      className={`jrc-Flex ${className}`}
      data-no-gap={noGap || undefined}
      data-flex-col={col || undefined}
      data-justify={justify}
      data-items={items}
    >
      {children}
    </div>
  );
}
