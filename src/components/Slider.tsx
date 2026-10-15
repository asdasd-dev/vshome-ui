import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cx } from "../utils/cx";

export type SliderProps = { value: number; min?: number; max?: number; step?: number; label: string; onCommit: (v: number) => void; format?: (v: number) => string; disabled?: boolean; className?: string };

export function Slider({ value, min = 1, max = 100, step = 1, label, onCommit, format = String, disabled, className }: SliderProps) {
  const [v, setV] = useState(value);
  const dragging = useRef(false);
  const sent = useRef(value);
  useEffect(() => {
    sent.current = value;
    if (!dragging.current) setV(value);
  }, [value]);
  const commit = () => {
    dragging.current = false;
    if (v === sent.current) return;
    sent.current = v;
    onCommit(v);
  };
  const fill = `${((v - min) / (max - min)) * 100}%`;
  return (
    <label className={cx("vs-slider", className)} style={{ "--vs-slider-fill": fill } as CSSProperties}>
      <input type="range" aria-label={label} aria-valuetext={format(v)} min={min} max={max} step={step} value={v} disabled={disabled}
             onPointerDown={() => { dragging.current = true; }} onChange={(e) => setV(Number(e.target.value))}
             onPointerUp={commit} onPointerCancel={commit} onKeyUp={commit} onTouchEnd={commit} />
      <span className="vs-slider__value">{format(v)}</span>
    </label>
  );
}
