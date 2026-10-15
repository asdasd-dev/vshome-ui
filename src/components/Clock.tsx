import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type ClockProps = { children: ReactNode; size?: "lg" | "xl" | "hero"; weight?: "medium" | "semibold"; align?: "start" | "center"; className?: string };

export function Clock({ children, size = "lg", weight = "medium", align, className }: ClockProps) {
  return <div className={cx("vs-clock", `vs-clock--${size}`, `vs-clock--w-${weight}`, align === "center" && "vs-clock--center", className)}>{children}</div>;
}
