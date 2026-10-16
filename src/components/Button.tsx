import type { ButtonHTMLAttributes } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";
import type { IconName } from "./icons";
import { Spinner } from "./Spinner";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "warn"; size?: "sm" | "md" | "lg"; shape?: "default" | "pill";
  block?: boolean; loading?: boolean; pressed?: boolean; icon?: IconName; indicator?: "lamp";
};

export function Button({ variant = "secondary", size, shape, block, loading, pressed, icon, indicator, disabled, className, type = "button", children, ...rest }: ButtonProps) {
  const lead = loading ? <Spinner size="sm" /> : icon ? <Icon name={icon} size="sm" /> : null;
  const lamp = indicator === "lamp" ? <Icon name="dot" size="md" tone={pressed ? "lamp" : undefined} className={cx("vs-button__lamp", !pressed && "vs-button__lamp--off")} /> : null;
  return (
    <button type={type} disabled={disabled || loading} aria-busy={loading || undefined} aria-pressed={pressed}
            className={cx("vs-button", `vs-button--${variant}`, size && size !== "md" && `vs-button--${size}`, shape === "pill" && "vs-button--pill", block && "vs-button--block", (lead || lamp) && "vs-button--icon", indicator && `vs-button--${indicator}`, className)} {...rest}>
      {lamp}{lead}{children}
    </button>
  );
}
