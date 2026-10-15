import type { ButtonHTMLAttributes } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";
import type { IconName } from "./icons";

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon: IconName; label: string; size?: "md" | "lg"; variant?: "plain" | "primary";
};

export function IconButton({ icon, label, size = "md", variant = "plain", className, type = "button", ...rest }: IconButtonProps) {
  return (
    <button type={type} aria-label={label} title={label} className={cx("vs-icon-button", `vs-icon-button--${size}`, `vs-icon-button--${variant}`, className)} {...rest}>
      <Icon name={icon} size={size === "lg" ? "lg" : "md"} />
    </button>
  );
}
