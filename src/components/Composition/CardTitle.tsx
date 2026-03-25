import { ReactNode } from "react";
import { Grid } from "./Grid";
import { Subtitle } from "./Subtitle";

type Props = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
};

export function CardTitle({ title, subtitle, children }: Props) {
  return (
    <div className="jrc-CardTitle">
      <Grid className="jrc-CardTitle__Grid">
        {title && <h1 className="jrc-CardTitle__title">{title}</h1>}
        {subtitle && <Subtitle className="jrc-CardTitle__Subtitle" text={subtitle} />}
      </Grid>
      {children}
    </div>
  );
}
