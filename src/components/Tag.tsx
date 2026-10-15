import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";
import type { IconName } from "./icons";

export type TagProps = { children: ReactNode; tone?: "default" | "accent" | "ok" | "warn" | "danger" | "muted" | "violet" | "pink" | "gold"; variant?: "soft" | "outline"; size?: "sm" | "md"; icon?: IconName; className?: string };

export function Tag({ children, tone = "default", variant = "soft", size = "md", icon, className }: TagProps) {
  return <span className={cx("vs-tag", `vs-tag--${tone}`, `vs-tag--${variant}`, `vs-tag--${size}`, className)}>{icon && <Icon name={icon} size="em" />}{children}</span>;
}
