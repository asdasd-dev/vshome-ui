import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type BadgeProps = { children?: ReactNode; tone?: "accent" | "muted" | "ok" | "warn" | "danger"; max?: number; dot?: boolean; label?: string; className?: string };

export function Badge({ children, tone = "accent", max, dot, label, className }: BadgeProps) {
  if (dot) return <span className={cx("vs-badge", `vs-badge--${tone}`, "vs-badge--dot", className)} role="img" aria-label={label} />;
  const text = typeof children === "number" && max != null && children > max ? `${max}+` : children;
  return <span className={cx("vs-badge", `vs-badge--${tone}`, className)} aria-label={label}>{text}</span>;
}
