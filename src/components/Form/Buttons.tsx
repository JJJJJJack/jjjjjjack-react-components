import { Grid } from "../Composition/Grid";
import { Label } from "./Label";

type Props = {
  noWrap?: boolean;
  className?: string;
  label?: string;
  containerClassname?: string;
  children: any;
};

export function Buttons({ noWrap = false, children, className, label, containerClassname }: Props) {
  return (
    <Grid className={containerClassname}>
      {label && <Label text={label} />}
      <div className={`jrc-Buttons ${className}`} data-nowrap={noWrap || undefined}>
        {children}
      </div>
    </Grid>
  );
}
