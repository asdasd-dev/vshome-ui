import type { ButtonHTMLAttributes } from "react";
import { cx } from "../utils/cx";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "danger" };

export function Button({ variant, className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={cx("vs-button", variant && `vs-button--${variant}`, className)} {...rest} />;
}
