import { ChangeEventHandler } from "react";
import { Label } from "./Label";

interface CheckboxProps {
  disabled?: boolean;
  id: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
  label: string;
}

export function Checkbox({ disabled, id, checked, onChange, label }: CheckboxProps) {
  return (
    <div className="jrc-Checkbox__container" data-disabled={disabled}>
      <input
        className="jrc-Checkbox"
        disabled={disabled}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <Label className="jrc-Checkbox__Label" disabled={disabled} text={label} htmlFor={id} />
    </div>
  );
}
