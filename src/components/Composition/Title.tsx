import { ReactNode } from "react";
import { Grid } from "./Grid";
import { Subtitle } from "./Subtitle";

type Props = {
  text?: string;
  subtitle?: string;
  children?: ReactNode;
};

export function Title({ text, subtitle, children }: Props) {
  return (
    <div className="jrc-Title">
      <Grid className="jrc-Title__Grid">
        {text && <h1 className="jrc-Title__text">{text}</h1>}
        {subtitle && <Subtitle className="jrc-Title__Subtitle" text={subtitle} />}
      </Grid>
      {children}
    </div>
  );
}
