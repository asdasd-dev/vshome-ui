import type { ButtonHTMLAttributes } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";
import type { IconName } from "./icons";
import { Spinner } from "./Spinner";

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon: IconName; label: string; size?: "sm" | "md" | "lg";
  variant?: "secondary" | "primary" | "ghost" | "plain";
  loading?: boolean;
};

export function IconButton({ icon, label, size = "md", variant = "secondary", loading, disabled, className, type = "button", ...rest }: IconButtonProps) {
  const v = variant === "plain" ? "secondary" : variant;
  return (
    <button type={type} aria-label={label} title={label} disabled={disabled || loading} aria-busy={loading || undefined}
            className={cx("vs-icon-button", `vs-icon-button--${size}`, `vs-icon-button--${v}`, className)} {...rest}>
      {loading ? <Spinner size={size === "lg" ? "md" : "sm"} /> : <Icon name={icon} size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"} />}
    </button>
  );
}
