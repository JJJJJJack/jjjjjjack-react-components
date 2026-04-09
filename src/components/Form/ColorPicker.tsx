import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful"; // TODO: remove and recreate
import { Button } from "./Button";
import { Input } from "./Input";

export function ColorPicker({
  value,
  icon,
  title = "Pick a color",
  onChange,
}: {
  value: string;
  text?: string;
  icon?: string;
  title?: string;
  onChange: (color: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [hexInput, setHexInput] = useState(value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (hex: string) => {
    setHexInput(hex);
    onChange(hex);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`;
    setHexInput(hex);
    if (/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(hex)) {
      onChange(hex);
    }
  };

  return (
    <div className="jrc-ColorPicker" ref={pickerRef}>
      <Button variant="tertiary" icon={icon as string} title={title} onClick={() => setOpen(o => !o)} />

      {open && (
        <div className="jrc-ColorPicker__tooltip">
          <HexColorPicker
            className="jrc-ColorPicker__tooltip__HexColorPicker"
            color={hexInput}
            onChange={handleChange}
          />
          <Input
            className="jrc-ColorPicker__tooltip__Input"
            type="text"
            value={hexInput}
            onChange={handleHexChange}
            placeholder="#rrggbb"
          />
        </div>
      )}
    </div>
  );
}
