import { useEffect, useState, type CSSProperties } from "react";

export type SliderProps = { value: number; min?: number; max?: number; step?: number; label: string; onCommit: (v: number) => void; format?: (v: number) => string };

export function Slider({ value, min = 1, max = 100, step = 1, label, onCommit, format = String }: SliderProps) {
  const [v, setV] = useState(value);
  useEffect(() => setV(value), [value]);
  const commit = () => { if (v !== value) onCommit(v); };
  const fill = `${((v - min) / (max - min)) * 100}%`;
  return (
    <label className="vs-slider" style={{ "--vs-slider-fill": fill } as CSSProperties}>
      <input type="range" aria-label={label} min={min} max={max} step={step} value={v}
             onChange={(e) => setV(Number(e.target.value))} onPointerUp={commit} onKeyUp={commit} onTouchEnd={commit} />
      <span className="vs-slider__value">{format(v)}</span>
    </label>
  );
}
