import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { useAction } from "../hooks/useAction";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";
import type { IconName } from "./icons";
import { Spinner } from "./Spinner";

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick"> & {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => unknown;
  icon: IconName; label: string; size?: "sm" | "md" | "lg";
  variant?: "secondary" | "primary" | "ghost" | "plain";
  loading?: boolean; pressed?: boolean;
};

export function IconButton({ icon, label, size = "md", variant = "secondary", loading, pressed, disabled, className, type = "button", onClick, ...rest }: IconButtonProps) {
  const action = useAction(onClick);
  const busy = loading || action.pending;
  const v = variant === "plain" ? "secondary" : variant;
  return (
    <button type={type} aria-label={label} title={label} disabled={disabled || loading} aria-busy={busy || undefined} aria-pressed={pressed} data-failed={action.failed || undefined} onClick={action.run}
            className={cx("vs-icon-button", `vs-icon-button--${size}`, `vs-icon-button--${v}`, className)} {...rest}>
      {busy ? <Spinner size={size === "lg" ? "md" : "sm"} /> : <Icon name={icon} size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"} />}
    </button>
  );
}
