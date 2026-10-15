import type { CSSProperties } from "react";
import { cx } from "../utils/cx";
import type { Tone } from "./tone";

export type ProgressProps = { value: number; max?: number; label: string; tone?: Tone; size?: "sm" | "md"; className?: string };

export function Progress({ value, max = 100, label, tone = "accent", size = "md", className }: ProgressProps) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return (
    <div role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} className={cx("vs-progress", `vs-progress--${size}`, className)}>
      <span className="vs-progress__fill" style={{ width: `${pct}%`, "--vs-progress-color": `var(--vs-${tone})` } as CSSProperties} />
    </div>
  );
}

export type SplitBarProps = { parts: { value: number; label: string; tone?: Tone; color?: string }[]; label: string; size?: "sm" | "md"; className?: string };

export function SplitBar({ parts, label, size = "md", className }: SplitBarProps) {
  const text = `${label}: ${parts.filter((p) => p.value > 0).map((p) => `${p.label} ${p.value}`).join(", ")}`;
  return (
    <div role="img" aria-label={text} className={cx("vs-split-bar", `vs-progress--${size}`, className)}>
      {parts.filter((p) => p.value > 0).map((p, i) => (
        <span key={i} className="vs-split-bar__part" title={`${p.label} ${p.value}`} style={{ flexGrow: p.value, "--vs-progress-color": p.color ?? `var(--vs-${p.tone ?? "accent"})` } as CSSProperties} />
      ))}
    </div>
  );
}
