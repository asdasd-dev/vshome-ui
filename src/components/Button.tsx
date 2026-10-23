import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { useAction } from "../hooks/useAction";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";
import type { IconName } from "./icons";
import { Spinner } from "./Spinner";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => unknown;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "warn"; size?: "sm" | "md" | "lg"; shape?: "default" | "pill";
  block?: boolean; loading?: boolean; pressed?: boolean; icon?: IconName; indicator?: "lamp";
};

export function Button({ variant = "secondary", size, shape, block, loading, pressed, icon, indicator, disabled, className, type = "button", onClick, children, ...rest }: ButtonProps) {
  const action = useAction(onClick);
  const busy = loading || action.pending;
  const lead = busy ? <Spinner size="sm" /> : icon ? <Icon name={icon} size="sm" /> : null;
  const lamp = indicator === "lamp" ? <Icon name="dot" size="md" tone={pressed ? "lamp" : undefined} className={cx("vs-button__lamp", !pressed && "vs-button__lamp--off")} /> : null;
  return (
    <button type={type} disabled={disabled || loading} aria-busy={busy || undefined} aria-pressed={pressed} data-failed={action.failed || undefined} onClick={action.run}
            className={cx("vs-button", `vs-button--${variant}`, size && size !== "md" && `vs-button--${size}`, shape === "pill" && "vs-button--pill", block && "vs-button--block", (lead || lamp) && "vs-button--icon", indicator && `vs-button--${indicator}`, className)} {...rest}>
      {lamp}{lead}{children}
    </button>
  );
}
