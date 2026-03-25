import { ReactNode } from "react";

type IconProps = {
  path: string;
  size?: string | number | undefined;
  className?: string;
  children?: ReactNode;
  viewBox?: string;
};

export function Icon({ path, size = 16, className = "", children, viewBox = "0 0 24 24" }: IconProps) {
  return (
    <span className={`jrc-Icon ${className}`}>
      <svg className="jrc-Icon__svg" viewBox={viewBox} width={size} height={size} aria-hidden="true" focusable="false">
        <path fill="currentColor" d={path} />
      </svg>
      {children}
    </span>
  );
}
