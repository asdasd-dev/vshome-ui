import type { ButtonHTMLAttributes } from "react";
import { cx } from "../utils/cx";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "danger"; pressed?: boolean };

export function Button({ variant, pressed, className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={cx("vs-button", variant && `vs-button--${variant}`, className)} aria-pressed={pressed} {...rest} />;
}
