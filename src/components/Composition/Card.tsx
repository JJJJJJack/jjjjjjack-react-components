import { ReactNode } from "react";
import { Grid } from "./Grid";

type Props = {
  className?: string;
  children: ReactNode;
  footer?: ReactNode;
  noHighlight?: boolean;
};

export function Card({ className = "", children, footer, noHighlight }: Props) {
  return (
    <Grid className={`jrc-Card jrc-cardbox ${className}`} noHighlight={noHighlight}>
      {children}
      {footer && <div className="jrc-Card__footer">{footer}</div>}
    </Grid>
  );
}
