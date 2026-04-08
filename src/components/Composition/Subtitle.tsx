type SubtitleProps = {
  disabled?: boolean;
  className?: string;
  text?: any;
};

export function Subtitle({ disabled = undefined, className = "", text }: SubtitleProps) {
  return (
    <span className={`jrc-Subtitle ${className}`} data-disabled={disabled || undefined}>
      {text === "" ? <>&nbsp;</> : text}
    </span>
  );
}
