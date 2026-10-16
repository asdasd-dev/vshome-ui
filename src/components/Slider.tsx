import type { CSSProperties } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";
import type { IconName } from "./icons";
import { useRangeCommit } from "./useRangeCommit";

export type SliderProps = { value: number; min?: number; max?: number; step?: number; label: string; onCommit: (v: number) => void; format?: (v: number) => string; icon?: IconName; disabled?: boolean; className?: string };

export function Slider({ value, min = 1, max = 100, step = 1, label, onCommit, format = String, icon, disabled, className }: SliderProps) {
  const { v, input } = useRangeCommit(value, onCommit);
  const fill = `${((v - min) / (max - min)) * 100}%`;
  return (
    <label className={cx("vs-slider", className)} style={{ "--vs-slider-fill": fill } as CSSProperties}>
      <input type="range" aria-label={label} aria-valuetext={format(v)} min={min} max={max} step={step} disabled={disabled} {...input} />
      {icon && <Icon name={icon} size="sm" className="vs-slider__icon" />}
      <span className="vs-slider__value">{format(v)}</span>
    </label>
  );
}
