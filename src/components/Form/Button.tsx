import { Icon } from "../Composition/Icon";

interface BaseButtonCoreProps {
  className?: string;
  disabled?: boolean;
  variant?: "secondary" | "tertiary" | "selected" | "warning" | "danger" | "outline-only" | "transparent" | "";
  small?: true;
  text?: any;
  title?: string;
  formSubmit?: boolean;
  children?: any;
  autoFocus?: boolean;
  tabIndex?: number;
  style?: React.CSSProperties;
}
interface WithIcon {
  icon: string;
  iconSize?: number;
}
interface WithoutIcon {
  icon?: undefined;
  iconSize?: undefined;
}
interface SubmitButton {
  formSubmit: true;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
interface NormalButton {
  formSubmit?: false | undefined;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
type ButtonProps =
  | (BaseButtonCoreProps & WithIcon & SubmitButton)
  | (BaseButtonCoreProps & WithIcon & NormalButton)
  | (BaseButtonCoreProps & WithoutIcon & SubmitButton)
  | (BaseButtonCoreProps & WithoutIcon & NormalButton);

export function Button({
  className = "",
  autoFocus,
  disabled,
  small,
  formSubmit,
  variant = "",
  text,
  icon,
  iconSize = 18,
  title = "",
  tabIndex,
  style,
  children,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      className={`jrc-Button ${className}`}
      type={formSubmit ? "submit" : "button"}
      disabled={disabled}
      onClick={e => {
        if (!formSubmit) {
          e.preventDefault();
        }
        onClick(e);
      }}
      title={title}
      autoFocus={autoFocus}
      tabIndex={tabIndex}
      data-no-text={!text ? "" : undefined}
      data-small={small}
      data-variant={variant}
      style={style}
    >
      {icon && <Icon path={icon} size={iconSize} />}
      {text}
      {children}
    </button>
  );
}
