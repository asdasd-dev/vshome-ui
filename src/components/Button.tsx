import type { ButtonHTMLAttributes } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";
import type { IconName } from "./icons";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "danger"; size?: "sm" | "md"; pressed?: boolean; icon?: IconName; indicator?: "lamp" };

export function Button({ variant, size, pressed, icon, indicator, className, type = "button", children, ...rest }: ButtonProps) {
  const lead = indicator === "lamp" && pressed ? <Icon name="dot" size="md" tone="lamp" /> : icon ? <Icon name={icon} size="sm" /> : null;
  return (
    <button type={type} className={cx("vs-button", variant && `vs-button--${variant}`, size === "sm" && "vs-button--sm", lead && "vs-button--icon", indicator && `vs-button--${indicator}`, className)} aria-pressed={pressed} {...rest}>
      {lead}{children}
    </button>
  );
}
