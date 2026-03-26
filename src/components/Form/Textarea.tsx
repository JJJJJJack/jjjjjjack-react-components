import { ChangeEventHandler } from "react";
import { Grid } from "../Composition/Grid";
import { Label } from "./Label";

interface TextareaProps {
  id?: string;
  className?: string;
  label?: string;
  helperSubtitle?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement, HTMLTextAreaElement>;
  rows?: number;
}

export function Textarea({
  className,
  id,
  label,
  helperSubtitle,
  placeholder = "Enter text here...",
  value,
  disabled,
  onChange,
  rows = 6,
}: TextareaProps) {
  return (
    <Grid className={className}>
      {label && <Label text={label} htmlFor={id} />}
      <div className="jrc-Textarea__grid-container">
        <textarea
          disabled={disabled}
          className="jrc-Textarea"
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          id={id}
        />
        {helperSubtitle && <span className="jrc-Textarea__subtitle">{helperSubtitle}</span>}
      </div>
    </Grid>
  );
}
