import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cx } from "../utils/cx";
import type { Tone } from "./tone";
import { useRangeGesture } from "./useRangeGesture";

export type RangeSliderProps = {
  label: string; value: [number, number]; onCommit: (lo: number, hi: number) => void; min?: number; max?: number; step?: number;
  format?: (v: number) => string; onChange?: (lo: number, hi: number) => void; tone?: Tone; disabled?: boolean; className?: string;
};

type Pair = [number, number];

export function RangeSlider({ label, value, onCommit, min = 0, max = 100, step = 1, format = String, onChange, tone = "accent", disabled, className }: RangeSliderProps) {
  const [v, setV] = useState<Pair>(value);
  const current = useRef<Pair>(value);
  const sent = useRef(value);
  const thumb = useRef<0 | 1 | null>(null);
  useEffect(() => { sent.current = value; current.current = value; setV(value); }, [value[0], value[1]]);
  const set = (n: Pair) => { current.current = n; setV(n); onChange?.(n[0], n[1]); };
  const setLo = (x: number) => set([Math.min(x, current.current[1]), current.current[1]]);
  const setHi = (x: number) => set([current.current[0], Math.max(x, current.current[0])]);
  const commit = () => {
    thumb.current = null;
    const n = current.current;
    if (n[0] !== sent.current[0] || n[1] !== sent.current[1]) { sent.current = n; onCommit(n[0], n[1]); }
  };
  const track = useRangeGesture({ min, max, step, disabled, onEnd: commit, onMove: (x) => {
    const [lo, hi] = current.current;
    thumb.current ??= x - lo < hi - x ? 0 : 1;
    (thumb.current === 0 ? setLo : setHi)(x);
  } });
  const pct = (x: number) => `${((x - min) / (max - min)) * 100}%`;
  const style = { "--vs-range-lo": pct(v[0]), "--vs-range-hi": pct(v[1]), "--vs-range-color": `var(--vs-${tone})` } as CSSProperties;
  return (
    <div className={cx("vs-range", className)} style={style} role="group" aria-label={label} {...track}>
      <span className="vs-range__track" aria-hidden="true"><span className="vs-range__fill" /></span>
      <input type="range" className={cx("vs-range__input", v[0] >= max - (max - min) / 2 && "vs-range__input--top")} aria-label={`${label}: от`} aria-valuetext={format(v[0])} min={min} max={max} step={step} value={v[0]} disabled={disabled}
             onChange={(e) => setLo(Number(e.target.value))} onKeyUp={commit} onBlur={commit} />
      <input type="range" className="vs-range__input" aria-label={`${label}: до`} aria-valuetext={format(v[1])} min={min} max={max} step={step} value={v[1]} disabled={disabled}
             onChange={(e) => setHi(Number(e.target.value))} onKeyUp={commit} onBlur={commit} />
    </div>
  );
}
