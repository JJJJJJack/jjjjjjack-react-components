export function Label({
  disabled = undefined,
  className = "",
  text,
  htmlFor = undefined,
}: {
  disabled?: boolean;
  className?: string;
  htmlFor?: any;
  text: any;
}) {
  return htmlFor ? (
    <label className={`jrc-Label jrc-text-nowrap ${className}`} data-disabled={disabled || undefined} htmlFor={htmlFor}>
      {text}
    </label>
  ) : (
    <span className={`jrc-Label jrc-text-nowrap ${className}`} data-disabled={disabled || undefined}>
      {text}
    </span>
  );
}
