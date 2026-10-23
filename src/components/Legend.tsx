import type { CSSProperties, ReactNode } from "react";
import { cx } from "../utils/cx";
import type { Tone } from "./tone";

export type LegendProps = { items: { label: ReactNode; tone?: Tone; color?: string; shape?: "dot" | "line" | "dash" | "square" }[]; className?: string };

export function Legend({ items, className }: LegendProps) {
  return (
    <ul className={cx("vs-legend", className)}>
      {items.map((it, i) => (
        <li key={i} className="vs-legend__item">
          <span className={cx("vs-legend__swatch", `vs-legend__swatch--${it.shape ?? "dot"}`)} style={{ "--vs-legend-color": it.color ?? `var(--vs-${it.tone ?? "accent"})` } as CSSProperties} />
          {it.label}
        </li>
      ))}
    </ul>
  );
}

export type CalendarColor = "orange" | "purple" | "blue" | "green";

export type StatusDotProps = { tone?: Tone; calendar?: CalendarColor; pulse?: boolean; label?: string; className?: string };

export function StatusDot({ tone = "ok", calendar, pulse, label, className }: StatusDotProps) {
  return <span className={cx("vs-status-dot", calendar ? `vs-status-dot--calendar-${calendar}` : `vs-status-dot--${tone}`, pulse && "vs-status-dot--pulse", className)} {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })} />;
}
