import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type StatProps = {
  value: ReactNode; unit?: ReactNode; caption?: ReactNode;
  size?: "md" | "lg" | "xl"; tone?: "default" | "muted" | "ok" | "warn" | "danger"; className?: string;
};

export function Stat({ value, unit, caption, size = "lg", tone = "default", className }: StatProps) {
  return (
    <div className={cx("vs-stat", `vs-stat--${size}`, `vs-stat--${tone}`, className)}>
      <div className="vs-stat__line"><span className="vs-stat__value">{value}</span>{unit && <span className="vs-stat__unit">{unit}</span>}</div>
      {caption && <div className="vs-stat__caption">{caption}</div>}
    </div>
  );
}
