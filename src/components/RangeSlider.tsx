import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cx } from "../utils/cx";
import type { Tone } from "./tone";

export type RangeSliderProps = {
  label: string; value: [number, number]; onCommit: (lo: number, hi: number) => void; min?: number; max?: number; step?: number;
  format?: (v: number) => string; onChange?: (lo: number, hi: number) => void; tone?: Tone; disabled?: boolean; className?: string;
};

export function RangeSlider({ label, value, onCommit, min = 0, max = 100, step = 1, format = String, onChange, tone = "accent", disabled, className }: RangeSliderProps) {
  const [v, setV] = useState<[number, number]>(value);
  const sent = useRef(value);
  useEffect(() => { sent.current = value; setV(value); }, [value[0], value[1]]);
  const commit = () => { if (v[0] !== sent.current[0] || v[1] !== sent.current[1]) { sent.current = v; onCommit(v[0], v[1]); } };
  const pct = (x: number) => `${((x - min) / (max - min)) * 100}%`;
  const style = { "--vs-range-lo": pct(v[0]), "--vs-range-hi": pct(v[1]), "--vs-range-color": `var(--vs-${tone})` } as CSSProperties;
  return (
    <div className={cx("vs-range", className)} style={style} role="group" aria-label={label}>
      <span className="vs-range__track" aria-hidden="true"><span className="vs-range__fill" /></span>
      <input type="range" className={cx("vs-range__input", v[0] >= max - (max - min) / 2 && "vs-range__input--top")} aria-label={`${label}: от`} aria-valuetext={format(v[0])} min={min} max={max} step={step} value={v[0]} disabled={disabled}
             onChange={(e) => { const n: [number, number] = [Math.min(Number(e.target.value), v[1]), v[1]]; setV(n); onChange?.(n[0], n[1]); }} onPointerUp={commit} onKeyUp={commit} onTouchEnd={commit} />
      <input type="range" className="vs-range__input" aria-label={`${label}: до`} aria-valuetext={format(v[1])} min={min} max={max} step={step} value={v[1]} disabled={disabled}
             onChange={(e) => { const n: [number, number] = [v[0], Math.max(Number(e.target.value), v[0])]; setV(n); onChange?.(n[0], n[1]); }} onPointerUp={commit} onKeyUp={commit} onTouchEnd={commit} />
    </div>
  );
}
