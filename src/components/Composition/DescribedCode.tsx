import { Grid } from "./Grid";
import { Subtitle } from "./Subtitle";

type DescribedCodeProps = {
  className?: string;
  subtitle?: string;
  text?: string;
  children?: React.ReactNode;
};

export function DescribedCode({ className, subtitle, text, children }: DescribedCodeProps) {
  return (
    <Grid className={`jrc-DescribedCode ${className}`}>
      <Subtitle className="jrc-DescribedCode__Subtitle" text={subtitle} />
      {text && <code className="jrc-DescribedCode__text">{text}</code>}
      {children}
    </Grid>
  );
}
