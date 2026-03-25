type SubtitleProps = {
  disabled?: boolean;
  className?: string;
  text?: any;
};

export function Subtitle({ disabled = undefined, className = "", text }: SubtitleProps) {
  return (
    <span data-disabled={disabled} className={`jrc-Subtitle ${className}`}>
      {text === "" ? <>&nbsp;</> : text}
    </span>
  );
}
