import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type ClockProps = { children: ReactNode; size?: "lg" | "xl" | "hero"; weight?: "medium" | "semibold"; tone?: "default" | "soft"; align?: "start" | "center"; className?: string };

export function Clock({ children, size = "lg", weight = "medium", tone, align, className }: ClockProps) {
  return <div className={cx("vs-clock", `vs-clock--${size}`, `vs-clock--w-${weight}`, tone === "soft" && "vs-clock--soft", align === "center" && "vs-clock--center", className)}>{children}</div>;
}
