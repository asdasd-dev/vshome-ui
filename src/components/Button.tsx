import type { ButtonHTMLAttributes } from "react";
import { cx } from "../utils/cx";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "danger"; size?: "sm" | "md"; pressed?: boolean };

export function Button({ variant, size, pressed, className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={cx("vs-button", variant && `vs-button--${variant}`, size === "sm" && "vs-button--sm", className)} aria-pressed={pressed} {...rest} />;
}
