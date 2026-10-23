import type { CSSProperties } from "react";
import { cx } from "../utils/cx";
import { useRangeCommit } from "./useRangeCommit";

export type SeekProps = { value: number; max: number; label: string; onCommit: (seconds: number) => void; disabled?: boolean; className?: string };

const two = (n: number) => String(n).padStart(2, "0");

export function formatDuration(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  return h ? `${h}:${two(m)}:${two(s % 60)}` : `${m}:${two(s % 60)}`;
}

export function Seek({ value, max, label, onCommit, disabled, className }: SeekProps) {
  const { v, input, track } = useRangeCommit(Math.min(value, max), onCommit, { min: 0, max, step: 1, disabled });
  const fill = `${max > 0 ? (v / max) * 100 : 0}%`;
  return (
    <div className={cx("vs-seek", className)}>
      <span className="vs-seek__time">{formatDuration(v)}</span>
      <label className="vs-range-line" style={{ "--vs-range-fill": fill } as CSSProperties} {...track}>
        <input type="range" aria-label={label} aria-valuetext={`${formatDuration(v)} из ${formatDuration(max)}`} min={0} max={max} step={1} disabled={disabled} {...input} />
      </label>
      <span className="vs-seek__time">{formatDuration(max)}</span>
    </div>
  );
}
